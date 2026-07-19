from datetime import datetime

import pytest

from app.contracts.workflow import (
    BoundedLevel,
    Delta,
    Evidence,
    SettlementRisk,
    Warning,
    WorkflowRequest,
    WorkflowResponse,
)
from app.core.errors import ErrorCode, WorkflowError
from app.engine.events import (
    AnalysisCompleted,
    AnalysisFailed,
    EstimateUpdated,
    EvidenceAdded,
    MarketResolved,
    StageCompleted,
    StageStarted,
)
from app.engine.pipeline import AnalysisEngine
from app.engine.skeptic import SkepticCalibration, _json_object
from app.tools.evidence_research import EvidenceSearchResult
from app.tools.kalshi_market_data import (
    MarketMetadata,
    PriceContext,
    PublicMarketData,
)
from app.tools.probability_scoring import ProbabilityScoringResult

SECRET = "test-secret-token"


def test_ag2_skeptic_structured_output_accepts_snake_case_fields() -> None:
    calibration = SkepticCalibration.model_validate(
        {
            "probability": 0.44,
            "confidence": "low",
            "thesis": "Evidence is too thin for a larger move.",
            "assumptions": ["Resolution criteria remain unchanged."],
            "counterarguments": [],
            "what_would_change": ["More direct evidence would increase confidence."],
            "critique_summary": "Reduced confidence because evidence was thin.",
        }
    )

    assert calibration.what_would_change == ["More direct evidence would increase confidence."]
    assert calibration.critique_summary == "Reduced confidence because evidence was thin."


def test_ag2_skeptic_body_parser_extracts_fenced_json() -> None:
    body = """
```json
{
  "probability": 0.44,
  "confidence": "low",
  "thesis": "Thin evidence.",
  "assumptions": ["Rules unchanged."],
  "what_would_change": ["Direct source."],
  "critique_summary": "Lowered confidence."
}
```
"""

    calibration = SkepticCalibration.model_validate_json(_json_object(body))

    assert calibration.probability == 0.44
    assert calibration.counterarguments == []


class FakeEventSource:
    async def resolve(self, event_input: str, *, now: datetime | None = None) -> PublicMarketData:
        del now
        return PublicMarketData(
            market=MarketMetadata(
                ticker=event_input.upper(),
                title=f"Will the demo event happen? {SECRET}",
                subtitle="Demo event",
                url=f"https://kalshi.com/markets/{event_input.upper()}",
                status="open",
                settlementSource="Official source named in market rules.",
            ),
            implied_probability=0.42,
            prices=PriceContext(yesBid=0.4, yesAsk=0.44, lastPrice=0.41, spread=0.04),
            volume=1200,
            openInterest=400,
            warnings=[],
        )


class FakeResearchTool:
    async def gather(self, query: str, *, max_results: int = 5) -> EvidenceSearchResult:
        del query, max_results
        return EvidenceSearchResult(
            evidence=[
                Evidence(
                    claim=f"Public evidence supports the event resolving yes. {SECRET}",
                    source_title="Official Source",
                    source_url="https://example.test/source",
                    relevance=BoundedLevel.HIGH,
                ),
                Evidence(
                    claim="A second public source supports the same direction.",
                    source_title="Independent Source",
                    source_url="https://example.test/independent",
                    relevance=BoundedLevel.MEDIUM,
                ),
            ],
            requirements=[],
        )


class FailingResearchTool:
    async def gather(self, query: str, *, max_results: int = 5) -> EvidenceSearchResult:
        del query, max_results
        raise ValueError("model returned non-json output")


class FakeSkepticCalibrator:
    async def calibrate(
        self,
        *,
        market_title: str,
        market_ticker: str,
        kalshi_implied_probability: float,
        draft: ProbabilityScoringResult,
        evidence: list[Evidence],
        settlement_risks: list[SettlementRisk],
        warnings: list[Warning],
    ) -> ProbabilityScoringResult:
        del market_title, market_ticker, evidence, settlement_risks, warnings
        probability = min(draft.probability, kalshi_implied_probability + 0.02)
        probability_points = probability - kalshi_implied_probability
        return draft.model_copy(
            update={
                "probability": probability,
                "confidence": BoundedLevel.LOW,
                "delta": Delta(
                    probability_points=probability_points,
                    direction="agent_higher" if probability_points > 0 else "in_line",
                ),
                "counterarguments": [*draft.counterarguments, "AG2 skeptic found thin evidence for a larger move."],
                "what_would_change": [
                    *draft.what_would_change,
                    "AG2 skeptic calibration: draft was reduced because evidence was thin.",
                ],
            }
        )


class FailingSkepticCalibrator:
    async def calibrate(
        self,
        *,
        market_title: str,
        market_ticker: str,
        kalshi_implied_probability: float,
        draft: ProbabilityScoringResult,
        evidence: list[Evidence],
        settlement_risks: list[SettlementRisk],
        warnings: list[Warning],
    ) -> ProbabilityScoringResult:
        del market_title, market_ticker, kalshi_implied_probability, draft, evidence, settlement_risks, warnings
        raise ValueError("invalid AG2 structured output")


def _live_engine(**overrides: object) -> AnalysisEngine:
    kwargs: dict[str, object] = {
        "event_source": FakeEventSource(),
        "research_tool": FakeResearchTool(),
        "secrets": [SECRET],
    }
    kwargs.update(overrides)
    return AnalysisEngine(**kwargs)  # type: ignore[arg-type]


@pytest.mark.asyncio
async def test_live_analysis_runs_fixed_six_agent_sequence_and_validates_json() -> None:
    engine = _live_engine()

    response = await engine.analyze(WorkflowRequest(market_input="kxexample-26may03-demo", demo_mode=False))
    payload = response.model_dump(by_alias=True, mode="json")

    assert WorkflowResponse.model_validate(payload) == response
    assert [entry.role for entry in response.agent_trace] == [
        "market_data",
        "settlement_rules",
        "research",
        "probability_estimator",
        "skeptic",
        "memo_editor",
    ]
    assert [entry.display_name for entry in response.agent_trace] == [
        "Market Data Agent",
        "Settlement Rules Agent",
        "Research Agent",
        "Probability Estimator Agent",
        "Skeptic Agent",
        "Memo Editor Agent",
    ]
    assert response.agent_trace[4].status == "skipped"


@pytest.mark.asyncio
async def test_live_analysis_can_run_mocked_ag2_skeptic_calibration() -> None:
    engine = _live_engine(skeptic_calibrator=FakeSkepticCalibrator())

    response = await engine.analyze(WorkflowRequest(market_input="KXEXAMPLE-26MAY03-DEMO", demo_mode=False))

    assert response.agent_trace[4].role == "skeptic"
    assert response.agent_trace[4].status == "completed"
    assert response.agent_estimate.confidence == BoundedLevel.LOW
    assert response.agent_estimate.probability == 0.44
    assert response.delta.probability_points == pytest.approx(0.02)
    assert any("AG2 skeptic" in item for item in response.what_would_change)


@pytest.mark.asyncio
async def test_live_analysis_redacts_secrets_from_validated_output() -> None:
    engine = _live_engine()

    response = await engine.analyze(WorkflowRequest(market_input="KXEXAMPLE-26MAY03-DEMO", demo_mode=False))

    assert SECRET not in response.model_dump_json(by_alias=True)
    assert "[redacted]" in response.market.title
    assert "[redacted]" in response.evidence[0].claim


@pytest.mark.asyncio
async def test_recoverable_analysis_failure_is_typed_error() -> None:
    engine = _live_engine(research_tool=FailingResearchTool())

    with pytest.raises(WorkflowError) as error:
        await engine.analyze(WorkflowRequest(market_input="KXEXAMPLE-26MAY03-DEMO", demo_mode=False))

    assert error.value.code == ErrorCode.MALFORMED_WORKFLOW_OUTPUT
    assert error.value.status_code == 502


@pytest.mark.asyncio
async def test_ag2_skeptic_failure_is_typed_model_error() -> None:
    engine = _live_engine(skeptic_calibrator=FailingSkepticCalibrator())

    with pytest.raises(WorkflowError) as error:
        await engine.analyze(WorkflowRequest(market_input="KXEXAMPLE-26MAY03-DEMO", demo_mode=False))

    assert error.value.code == ErrorCode.MALFORMED_WORKFLOW_OUTPUT
    assert error.value.status_code == 502


@pytest.mark.asyncio
async def test_live_stream_interleaves_progress_events_and_ends_with_final() -> None:
    engine = _live_engine(skeptic_calibrator=FakeSkepticCalibrator())

    events = [
        event
        async for event in engine.stream(
            WorkflowRequest(market_input="KXEXAMPLE-26MAY03-DEMO", demo_mode=False), pace_seconds=0.0
        )
    ]

    assert isinstance(events[0], StageStarted)
    assert events[0].stage == "market_data"
    assert any(isinstance(event, MarketResolved) for event in events)
    assert any(isinstance(event, EvidenceAdded) for event in events)

    estimates = [event for event in events if isinstance(event, EstimateUpdated)]
    assert [estimate.basis for estimate in estimates] == ["market_prior", "research_draft", "skeptic_calibrated"]
    assert estimates[0].probability == 0.42

    final = events[-1]
    assert isinstance(final, AnalysisCompleted)
    blocking = await engine.analyze(WorkflowRequest(market_input="KXEXAMPLE-26MAY03-DEMO", demo_mode=False))
    assert _without_timestamps(final.response) == _without_timestamps(blocking)


def _without_timestamps(response: WorkflowResponse) -> dict[str, object]:
    payload = response.model_dump(by_alias=True, mode="json")
    del payload["analyzedAt"]
    del payload["kalshi"]["lastUpdatedAt"]
    return payload


@pytest.mark.asyncio
async def test_live_stream_redacts_secrets_from_progress_events() -> None:
    engine = _live_engine()

    events = [
        event
        async for event in engine.stream(
            WorkflowRequest(market_input="KXEXAMPLE-26MAY03-DEMO", demo_mode=False), pace_seconds=0.0
        )
    ]

    serialized = "".join(event.model_dump_json(by_alias=True) for event in events)
    assert SECRET not in serialized
    assert "[redacted]" in serialized


@pytest.mark.asyncio
async def test_live_stream_failure_yields_error_event_instead_of_raising() -> None:
    engine = _live_engine(research_tool=FailingResearchTool())

    events = [
        event
        async for event in engine.stream(
            WorkflowRequest(market_input="KXEXAMPLE-26MAY03-DEMO", demo_mode=False), pace_seconds=0.0
        )
    ]

    final = events[-1]
    assert isinstance(final, AnalysisFailed)
    assert final.code == ErrorCode.MALFORMED_WORKFLOW_OUTPUT
    assert final.status_code == 502


@pytest.mark.asyncio
async def test_demo_stream_replays_the_demo_response_with_same_event_shapes() -> None:
    engine = AnalysisEngine()

    events = [event async for event in engine.stream(WorkflowRequest(market_input="anything"), pace_seconds=0.0)]

    assert isinstance(events[0], StageStarted)
    stage_completions = [event for event in events if isinstance(event, StageCompleted)]
    assert {completion.stage for completion in stage_completions} == {
        "market_data",
        "settlement_rules",
        "research",
        "probability_estimator",
        "skeptic",
        "memo_editor",
    }

    final = events[-1]
    assert isinstance(final, AnalysisCompleted)
    assert final.response == await engine.analyze(WorkflowRequest(market_input="anything"))

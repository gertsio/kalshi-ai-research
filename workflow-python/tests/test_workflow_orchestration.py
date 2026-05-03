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
from app.orchestrator.ag2_skeptic import SkepticCalibration, _json_object
from app.orchestrator.service import WorkflowService
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


class FakeMarketDataTool:
    async def fetch(self, ticker: str, *, now: object | None = None) -> PublicMarketData:
        del now
        return PublicMarketData(
            market=MarketMetadata(
                ticker=ticker.upper(),
                title=f"Will the demo event happen? {SECRET}",
                subtitle="Demo event",
                url=f"https://kalshi.com/markets/{ticker.upper()}",
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


@pytest.mark.asyncio
async def test_live_workflow_runs_fixed_six_agent_sequence_and_validates_json() -> None:
    service = WorkflowService(
        market_data_tool=FakeMarketDataTool(), research_tool=FakeResearchTool(), secrets=[SECRET]
    )

    response = await service.analyze(WorkflowRequest(market_input="kxexample-26may03-demo", demo_mode=False))
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
async def test_live_workflow_can_run_mocked_ag2_skeptic_calibration() -> None:
    service = WorkflowService(
        market_data_tool=FakeMarketDataTool(),
        research_tool=FakeResearchTool(),
        skeptic_calibrator=FakeSkepticCalibrator(),
        secrets=[SECRET],
    )

    response = await service.analyze(WorkflowRequest(market_input="KXEXAMPLE-26MAY03-DEMO", demo_mode=False))

    assert response.agent_trace[4].role == "skeptic"
    assert response.agent_trace[4].status == "completed"
    assert response.agent_estimate.confidence == BoundedLevel.LOW
    assert response.agent_estimate.probability == 0.44
    assert response.delta.probability_points == pytest.approx(0.02)
    assert any("AG2 skeptic" in item for item in response.what_would_change)


@pytest.mark.asyncio
async def test_live_workflow_redacts_secrets_from_validated_output() -> None:
    service = WorkflowService(
        market_data_tool=FakeMarketDataTool(), research_tool=FakeResearchTool(), secrets=[SECRET]
    )

    response = await service.analyze(WorkflowRequest(market_input="KXEXAMPLE-26MAY03-DEMO", demo_mode=False))

    assert SECRET not in response.model_dump_json(by_alias=True)
    assert "[redacted]" in response.market.title
    assert "[redacted]" in response.evidence[0].claim


@pytest.mark.asyncio
async def test_recoverable_orchestration_failure_is_typed_error() -> None:
    service = WorkflowService(
        market_data_tool=FakeMarketDataTool(), research_tool=FailingResearchTool(), secrets=[SECRET]
    )

    with pytest.raises(WorkflowError) as error:
        await service.analyze(WorkflowRequest(market_input="KXEXAMPLE-26MAY03-DEMO", demo_mode=False))

    assert error.value.code == ErrorCode.MALFORMED_WORKFLOW_OUTPUT
    assert error.value.status_code == 502


@pytest.mark.asyncio
async def test_ag2_skeptic_failure_is_typed_model_error() -> None:
    service = WorkflowService(
        market_data_tool=FakeMarketDataTool(),
        research_tool=FakeResearchTool(),
        skeptic_calibrator=FailingSkepticCalibrator(),
        secrets=[SECRET],
    )

    with pytest.raises(WorkflowError) as error:
        await service.analyze(WorkflowRequest(market_input="KXEXAMPLE-26MAY03-DEMO", demo_mode=False))

    assert error.value.code == ErrorCode.MALFORMED_WORKFLOW_OUTPUT
    assert error.value.status_code == 502

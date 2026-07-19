from collections.abc import AsyncIterator
from datetime import UTC, datetime
from typing import Protocol

from pydantic import TypeAdapter, ValidationError

from app.contracts.workflow import (
    AgentRole,
    AgentTraceEntry,
    Evidence,
    KalshiSnapshot,
    Market,
    SettlementRisk,
    Warning,
    WorkflowRequest,
    WorkflowResponse,
)
from app.core.config import get_settings
from app.core.errors import ErrorCode, WorkflowError
from app.engine.events import (
    STAGE_HEADLINES,
    AnalysisCompleted,
    AnalysisEvent,
    AnalysisFailed,
    EstimateUpdated,
    EvidenceAdded,
    MarketResolved,
    SettlementRiskFound,
    SourceFound,
    StageCompleted,
    StageStarted,
    WarningRaised,
)
from app.engine.replay import replay
from app.engine.skeptic import Ag2SkepticCalibrator, SkepticCalibrator
from app.fixtures.demo_response import build_demo_response
from app.sources.base import EventSource
from app.sources.kalshi import KalshiEventSource
from app.tools.evidence_research import EvidenceResearchTool, EvidenceSearchResult, TavilySearchProvider
from app.tools.gemini_probability import GeminiProbabilityTool
from app.tools.kalshi_market_data import PublicMarketData
from app.tools.probability_scoring import ProbabilityScoringResult, score_probability
from app.tools.settlement_risk import audit_settlement_risk

DEMO_PACE_SECONDS = 0.45

_EVENT_ADAPTER: TypeAdapter[AnalysisEvent] = TypeAdapter(AnalysisEvent)


class ResearchTool(Protocol):
    async def gather(self, query: str, *, max_results: int = 5) -> EvidenceSearchResult: ...


class ProbabilityTool(Protocol):
    async def score(
        self,
        *,
        market_title: str,
        market_ticker: str,
        kalshi_implied_probability: float,
        evidence: list[Evidence],
        settlement_risks: list[SettlementRisk],
        warnings: list[Warning],
    ) -> ProbabilityScoringResult: ...


AGENT_SEQUENCE: tuple[tuple[AgentRole, str], ...] = (
    (AgentRole.MARKET_DATA, "Market Data Agent"),
    (AgentRole.SETTLEMENT_RULES, "Settlement Rules Agent"),
    (AgentRole.RESEARCH, "Research Agent"),
    (AgentRole.PROBABILITY_ESTIMATOR, "Probability Estimator Agent"),
    (AgentRole.SKEPTIC, "Skeptic Agent"),
    (AgentRole.MEMO_EDITOR, "Memo Editor Agent"),
)
AGENT_DISPLAY_NAMES = dict(AGENT_SEQUENCE)


class AnalysisEngine:
    """Runs one event analysis as a stream of typed progress events.

    `stream` is the single code path; `analyze` consumes it and returns the
    final validated response for blocking clients.
    """

    def __init__(
        self,
        *,
        event_source: EventSource | None = None,
        research_tool: ResearchTool | None = None,
        probability_tool: ProbabilityTool | None = None,
        skeptic_calibrator: SkepticCalibrator | None = None,
        secrets: list[str] | None = None,
        demo_pace_seconds: float = DEMO_PACE_SECONDS,
    ) -> None:
        self._event_source = event_source
        self._research_tool = research_tool
        self._probability_tool = probability_tool
        self._skeptic_calibrator = skeptic_calibrator
        self._secrets = [secret for secret in secrets or [] if secret]
        self._demo_pace_seconds = demo_pace_seconds

    async def stream(
        self, request: WorkflowRequest, *, pace_seconds: float | None = None
    ) -> AsyncIterator[AnalysisEvent]:
        pace = self._demo_pace_seconds if pace_seconds is None else pace_seconds
        try:
            async for event in self._events(request, pace):
                yield _redact_event(event, self._secrets)
        except WorkflowError as exc:
            yield AnalysisFailed(code=exc.code, message=exc.message, status_code=exc.status_code)
        except (ValidationError, ValueError):
            yield AnalysisFailed(
                code=ErrorCode.MALFORMED_WORKFLOW_OUTPUT,
                message="Workflow produced invalid structured output.",
                status_code=502,
            )

    async def analyze(self, request: WorkflowRequest) -> WorkflowResponse:
        async for event in self.stream(request, pace_seconds=0.0):
            if isinstance(event, AnalysisCompleted):
                return event.response
            if isinstance(event, AnalysisFailed):
                raise WorkflowError(event.code, event.message, status_code=event.status_code)
        raise WorkflowError(
            ErrorCode.MALFORMED_WORKFLOW_OUTPUT, "Analysis ended without a final response.", status_code=502
        )

    async def _events(self, request: WorkflowRequest, pace_seconds: float) -> AsyncIterator[AnalysisEvent]:
        if request.demo_mode is not False:
            async for event in replay(build_demo_response(), pace_seconds=pace_seconds):
                yield event
            return

        if self._event_source is None or self._research_tool is None:
            raise WorkflowError(
                ErrorCode.WORKFLOW_UNAVAILABLE, "Live workflow tools are not configured.", status_code=503
            )

        trace: list[AgentTraceEntry] = []
        analyzed_at = datetime.now(UTC)

        yield _started(AgentRole.MARKET_DATA)
        market_data = await self._event_source.resolve(request.market_input, now=analyzed_at)
        market = Market.model_validate(market_data.market.model_dump(by_alias=True))
        kalshi = KalshiSnapshot(
            implied_probability=market_data.implied_probability,
            yes_bid=market_data.prices.yes_bid,
            yes_ask=market_data.prices.yes_ask,
            spread=market_data.prices.spread,
            volume=market_data.volume,
            open_interest=market_data.open_interest,
            last_updated_at=analyzed_at,
        )
        yield MarketResolved(market=market, kalshi=kalshi)
        yield EstimateUpdated(probability=market_data.implied_probability, basis="market_prior")
        for warning in market_data.warnings:
            yield WarningRaised(warning=warning)
        yield _completed(trace, AgentRole.MARKET_DATA, "Captured public Kalshi market data and price context.")

        yield _started(AgentRole.SETTLEMENT_RULES)
        settlement_risks = audit_settlement_risk(market_data)
        for risk in settlement_risks:
            yield SettlementRiskFound(risk=risk)
        yield _completed(trace, AgentRole.SETTLEMENT_RULES, "Reviewed settlement source and wording ambiguity.")

        yield _started(AgentRole.RESEARCH)
        research = await self._research_tool.gather(_research_query(market_data), max_results=5)
        for item in research.evidence:
            yield SourceFound(
                source_title=item.source_title,
                source_url=item.source_url,
                published_at=item.source_published_at,
                relevance=item.relevance,
            )
            yield EvidenceAdded(evidence=item)
        yield _completed(trace, AgentRole.RESEARCH, "Gathered public evidence for the exact market criteria.")

        yield _started(AgentRole.PROBABILITY_ESTIMATOR)
        if self._probability_tool is None:
            scoring = score_probability(
                kalshi_implied_probability=market_data.implied_probability,
                evidence=research.evidence,
                settlement_risks=settlement_risks,
                warnings=market_data.warnings,
            )
        else:
            scoring = await self._probability_tool.score(
                market_title=market_data.market.title,
                market_ticker=market_data.market.ticker,
                kalshi_implied_probability=market_data.implied_probability,
                evidence=research.evidence,
                settlement_risks=settlement_risks,
                warnings=market_data.warnings,
            )
        yield EstimateUpdated(probability=scoring.probability, confidence=scoring.confidence, basis="research_draft")
        yield _completed(trace, AgentRole.PROBABILITY_ESTIMATOR, "Produced a bounded probability estimate.")

        if self._skeptic_calibrator is None:
            trace.append(_trace(AgentRole.SKEPTIC, "AG2 skeptic calibration is disabled.", status="skipped"))
            yield StageCompleted(
                stage=AgentRole.SKEPTIC, summary="AG2 skeptic calibration is disabled.", status="skipped"
            )
        else:
            yield _started(AgentRole.SKEPTIC)
            scoring = await self._skeptic_calibrator.calibrate(
                market_title=market_data.market.title,
                market_ticker=market_data.market.ticker,
                kalshi_implied_probability=market_data.implied_probability,
                draft=scoring,
                evidence=research.evidence,
                settlement_risks=settlement_risks,
                warnings=market_data.warnings,
            )
            yield EstimateUpdated(
                probability=scoring.probability, confidence=scoring.confidence, basis="skeptic_calibrated"
            )
            yield _completed(trace, AgentRole.SKEPTIC, "Ran AG2 skeptic calibration on the draft estimate.")

        yield _started(AgentRole.MEMO_EDITOR)
        trace.append(_trace(AgentRole.MEMO_EDITOR, "Validated strict JSON response contract."))
        payload = _response_payload(analyzed_at, market, kalshi, market_data, scoring, research.evidence, trace)
        response = WorkflowResponse.model_validate(_redact_secrets(payload, self._secrets))
        yield StageCompleted(stage=AgentRole.MEMO_EDITOR, summary="Validated strict JSON response contract.")
        yield AnalysisCompleted(response=response)


def get_analysis_engine() -> AnalysisEngine:
    settings = get_settings()
    research_tool = None
    probability_tool = None
    secrets = []
    if settings.tavily_api_key:
        research_tool = EvidenceResearchTool(TavilySearchProvider(settings.tavily_api_key))
        secrets.append(settings.tavily_api_key)
    if settings.gemini_api_key:
        probability_tool = GeminiProbabilityTool(
            settings.gemini_api_key,
            model=settings.gemini_model,
            base_url=settings.gemini_base_url,
        )
        secrets.append(settings.gemini_api_key)
    skeptic_calibrator = None
    if settings.ag2_enabled and settings.gemini_api_key:
        skeptic_calibrator = Ag2SkepticCalibrator(
            api_key=settings.gemini_api_key,
            model=settings.gemini_model,
            base_url=settings.gemini_base_url,
        )
    return AnalysisEngine(
        event_source=KalshiEventSource(),
        research_tool=research_tool,
        probability_tool=probability_tool,
        skeptic_calibrator=skeptic_calibrator,
        secrets=secrets,
    )


def _started(role: AgentRole) -> StageStarted:
    return StageStarted(stage=role, display_name=AGENT_DISPLAY_NAMES[role], headline=STAGE_HEADLINES[role])


def _completed(trace: list[AgentTraceEntry], role: AgentRole, summary: str) -> StageCompleted:
    trace.append(_trace(role, summary))
    return StageCompleted(stage=role, summary=summary)


def _trace(role: AgentRole, summary: str, *, status: str = "completed") -> AgentTraceEntry:
    return AgentTraceEntry(role=role, display_name=AGENT_DISPLAY_NAMES[role], summary=summary, status=status)


def _research_query(market_data: PublicMarketData) -> str:
    return f"{market_data.market.title} {market_data.market.ticker} settlement evidence"


def _response_payload(
    analyzed_at: datetime,
    market: Market,
    kalshi: KalshiSnapshot,
    market_data: PublicMarketData,
    scoring: ProbabilityScoringResult,
    evidence: list[Evidence],
    trace: list[AgentTraceEntry],
) -> dict[str, object]:
    return {
        "schemaVersion": "1.0",
        "analyzedAt": analyzed_at.isoformat(),
        "market": market.model_dump(by_alias=True, mode="json"),
        "kalshi": kalshi.model_dump(by_alias=True, mode="json"),
        "agentEstimate": scoring.model_dump(
            by_alias=True,
            mode="json",
            exclude={"delta", "counterarguments", "settlement_risks", "what_would_change"},
        ),
        "delta": scoring.delta.model_dump(by_alias=True, mode="json"),
        "evidence": [item.model_dump(by_alias=True, mode="json") for item in evidence],
        "counterarguments": scoring.counterarguments,
        "settlementRisks": [item.model_dump(by_alias=True, mode="json") for item in scoring.settlement_risks],
        "warnings": [item.model_dump(by_alias=True, mode="json") for item in market_data.warnings],
        "whatWouldChange": scoring.what_would_change,
        "agentTrace": [entry.model_dump(by_alias=True, mode="json") for entry in trace],
        "finalMemoMarkdown": _memo_markdown(market_data, scoring),
        "developer": {"rawJsonInspectionEnabled": True, "rawJsonLabel": "Validated workflow response JSON"},
        "disclaimer": (
            "This is research-only analysis, not financial advice or trading advice, and not a recommendation or order "
            "instruction."
        ),
    }


def _memo_markdown(market_data: PublicMarketData, scoring: ProbabilityScoringResult) -> str:
    return (
        "## Research Memo\n\n"
        f"Kalshi implies {market_data.implied_probability:.0%} for {market_data.market.ticker}. "
        f"The agent estimate is {scoring.probability:.0%} with {scoring.confidence} confidence. "
        f"{scoring.thesis}"
    )


def _redact_event(event: AnalysisEvent, secrets: list[str]) -> AnalysisEvent:
    if not secrets:
        return event
    redacted = _redact_secrets(event.model_dump(by_alias=True, mode="json"), secrets)
    return _EVENT_ADAPTER.validate_python(redacted)


def _redact_secrets(value: object, secrets: list[str]) -> object:
    if isinstance(value, str):
        redacted = value
        for secret in secrets:
            redacted = redacted.replace(secret, "[redacted]")
        return redacted
    if isinstance(value, list):
        return [_redact_secrets(item, secrets) for item in value]
    if isinstance(value, dict):
        return {key: _redact_secrets(item, secrets) for key, item in value.items()}
    return value

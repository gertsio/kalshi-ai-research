from datetime import UTC, datetime
from typing import Protocol

from pydantic import ValidationError

from app.contracts.workflow import (
    AgentRole,
    AgentTraceEntry,
    Evidence,
    WorkflowRequest,
    WorkflowResponse,
)
from app.core.config import get_settings
from app.core.errors import ErrorCode, WorkflowError
from app.fixtures.demo_response import build_demo_response
from app.tools.evidence_research import EvidenceResearchTool, EvidenceSearchResult, TavilySearchProvider
from app.tools.kalshi_market_data import KalshiPublicMarketDataTool, PublicMarketData
from app.tools.probability_scoring import ProbabilityScoringResult, score_probability
from app.tools.settlement_risk import audit_settlement_risk


class MarketDataTool(Protocol):
    async def fetch(self, ticker: str, *, now: datetime | None = None) -> PublicMarketData: ...


class ResearchTool(Protocol):
    async def gather(self, query: str, *, max_results: int = 5) -> EvidenceSearchResult: ...


AGENT_SEQUENCE: tuple[tuple[AgentRole, str], ...] = (
    (AgentRole.MARKET_DATA, "Market Data Agent"),
    (AgentRole.SETTLEMENT_RULES, "Settlement Rules Agent"),
    (AgentRole.RESEARCH, "Research Agent"),
    (AgentRole.PROBABILITY_ESTIMATOR, "Probability Estimator Agent"),
    (AgentRole.SKEPTIC, "Skeptic Agent"),
    (AgentRole.MEMO_EDITOR, "Memo Editor Agent"),
)


class WorkflowService:
    def __init__(
        self,
        *,
        market_data_tool: MarketDataTool | None = None,
        research_tool: ResearchTool | None = None,
        secrets: list[str] | None = None,
    ) -> None:
        self._market_data_tool = market_data_tool
        self._research_tool = research_tool
        self._secrets = [secret for secret in secrets or [] if secret]

    async def analyze(self, request: WorkflowRequest) -> WorkflowResponse:
        if request.demo_mode is not False:
            return build_demo_response()

        if self._market_data_tool is None or self._research_tool is None:
            raise WorkflowError(
                ErrorCode.WORKFLOW_UNAVAILABLE, "Live workflow tools are not configured.", status_code=503
            )

        trace: list[AgentTraceEntry] = []
        try:
            market_data = await self._market_data_tool.fetch(request.market_input, now=datetime.now(UTC))
            trace.append(_trace(AgentRole.MARKET_DATA, "Captured public Kalshi market data and price context."))

            settlement_risks = audit_settlement_risk(market_data)
            trace.append(_trace(AgentRole.SETTLEMENT_RULES, "Reviewed settlement source and wording ambiguity."))

            research = await self._research_tool.gather(_research_query(market_data), max_results=5)
            trace.append(_trace(AgentRole.RESEARCH, "Gathered public evidence for the exact market criteria."))

            scoring = score_probability(
                kalshi_implied_probability=market_data.implied_probability,
                evidence=research.evidence,
                settlement_risks=settlement_risks,
                warnings=market_data.warnings,
            )
            trace.append(_trace(AgentRole.PROBABILITY_ESTIMATOR, "Produced a bounded probability estimate."))
            trace.append(_trace(AgentRole.SKEPTIC, "Added counterarguments and change conditions."))
            trace.append(_trace(AgentRole.MEMO_EDITOR, "Validated strict JSON response contract."))

            payload = _response_payload(market_data, scoring, research.evidence, trace)
            sanitized = _redact_secrets(payload, self._secrets)
            return WorkflowResponse.model_validate(sanitized)
        except WorkflowError:
            raise
        except (ValidationError, ValueError) as exc:
            raise WorkflowError(
                ErrorCode.MALFORMED_WORKFLOW_OUTPUT, "Workflow produced invalid structured output.", status_code=502
            ) from exc


def get_workflow_service() -> WorkflowService:
    settings = get_settings()
    research_tool = None
    secrets = []
    if settings.tavily_api_key:
        research_tool = EvidenceResearchTool(TavilySearchProvider(settings.tavily_api_key))
        secrets.append(settings.tavily_api_key)
    return WorkflowService(
        market_data_tool=KalshiPublicMarketDataTool(),
        research_tool=research_tool,
        secrets=secrets,
    )


def _trace(role: AgentRole, summary: str) -> AgentTraceEntry:
    display_names = dict(AGENT_SEQUENCE)
    return AgentTraceEntry(role=role, display_name=display_names[role], summary=summary, status="completed")


def _research_query(market_data: PublicMarketData) -> str:
    return f"{market_data.market.title} {market_data.market.ticker} settlement evidence"


def _response_payload(
    market_data: PublicMarketData,
    scoring: ProbabilityScoringResult,
    evidence: list[Evidence],
    trace: list[AgentTraceEntry],
) -> dict[str, object]:
    return {
        "schemaVersion": "1.0",
        "analyzedAt": datetime.now(UTC).isoformat(),
        "market": market_data.market.model_dump(by_alias=True, mode="json"),
        "kalshi": {
            "impliedProbability": market_data.implied_probability,
            "yesBid": market_data.prices.yes_bid,
            "yesAsk": market_data.prices.yes_ask,
            "spread": market_data.prices.spread,
            "volume": market_data.volume,
            "openInterest": market_data.open_interest,
            "lastUpdatedAt": datetime.now(UTC).isoformat(),
        },
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

import pytest

from app.contracts.workflow import BoundedLevel, Evidence, WorkflowRequest, WorkflowResponse
from app.core.errors import ErrorCode, WorkflowError
from app.orchestrator.service import WorkflowService
from app.tools.evidence_research import EvidenceSearchResult
from app.tools.kalshi_market_data import (
    MarketMetadata,
    PriceContext,
    PublicMarketData,
)

SECRET = "test-secret-token"


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

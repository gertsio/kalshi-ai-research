from typing import Any

import httpx
import pytest

from app.contracts.workflow import BoundedLevel
from app.tools.evidence_research import (
    EvidenceResearchTool,
    MockSearchProvider,
    TavilySearchProvider,
    normalize_search_results,
)


def _result(**overrides: Any) -> dict[str, Any]:
    result = {
        "title": "Official Jobs Report",
        "url": "https://example.test/jobs",
        "content": "The official report says payrolls increased by 180,000 in April.",
        "score": 0.91,
        "published_date": "2026-05-01T12:00:00Z",
        "domain": "example.test",
    }
    result.update(overrides)
    return result


def test_normalizes_search_results_to_traceable_evidence() -> None:
    evidence = normalize_search_results([_result(title="  Official Jobs Report  ", content=" Payrolls rose.  ")])

    assert len(evidence) == 1
    assert evidence[0].claim == "Payrolls rose."
    assert evidence[0].source_title == "Official Jobs Report"
    assert str(evidence[0].source_url) == "https://example.test/jobs"
    assert evidence[0].context == "example.test"
    assert evidence[0].source_published_at is not None
    assert evidence[0].relevance == BoundedLevel.HIGH


def test_deduplicates_obviously_repeated_sources() -> None:
    evidence = normalize_search_results(
        [
            _result(title="First", url="https://example.test/jobs/", content="First claim."),
            _result(title="Second", url="https://example.test/jobs", content="Second claim."),
            _result(title="Official Jobs Report", url=None, content="Title duplicate."),
            _result(title="Official Jobs Report", url=None, content="Title duplicate again."),
        ]
    )

    assert [item.claim for item in evidence] == ["First claim.", "Title duplicate."]


def test_missing_url_is_allowed() -> None:
    evidence = normalize_search_results([_result(url=None)])

    assert evidence[0].source_url is None


def test_invalid_relevance_score_is_rejected() -> None:
    with pytest.raises(ValueError, match="relevance score"):
        normalize_search_results([_result(score=1.2)])


@pytest.mark.asyncio
async def test_mock_provider_supports_testable_research_path() -> None:
    tool = EvidenceResearchTool(MockSearchProvider([_result(score=0.7), _result(title="Other", url=None, score=0.4)]))

    result = await tool.gather("jobs report", max_results=2)

    assert [item.relevance for item in result.evidence] == [BoundedLevel.MEDIUM, BoundedLevel.LOW]
    requirements = {
        (requirement.confidence, requirement.min_sources, requirement.min_relevance)
        for requirement in result.requirements
    }
    assert requirements == {
        (BoundedLevel.MEDIUM, 2, BoundedLevel.MEDIUM),
        (BoundedLevel.HIGH, 3, BoundedLevel.HIGH),
    }


@pytest.mark.asyncio
async def test_tavily_provider_posts_live_search_request_shape() -> None:
    requests: list[httpx.Request] = []

    def handler(request: httpx.Request) -> httpx.Response:
        requests.append(request)
        return httpx.Response(200, json={"results": [_result()]})

    provider = TavilySearchProvider(
        api_key="test-key",
        api_url="https://tavily.test/search",
        transport=httpx.MockTransport(handler),
    )

    results = await provider.search("jobs report", max_results=3)

    assert results == [_result()]
    assert requests[0].url == "https://tavily.test/search"
    assert requests[0].headers["authorization"] == "Bearer test-key"
    assert requests[0].read() == (
        b'{"query":"jobs report","search_depth":"basic","topic":"news","include_answer":false,"max_results":3}'
    )

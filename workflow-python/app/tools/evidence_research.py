from datetime import datetime
from typing import Any, Protocol

import httpx
from pydantic import BaseModel, ConfigDict, Field

from app.contracts.workflow import BoundedLevel, Evidence
from app.core.errors import ErrorCode, WorkflowError

TAVILY_SEARCH_API_URL = "https://api.tavily.com/search"


class EvidenceRequirement(BaseModel):
    confidence: BoundedLevel
    min_sources: int = Field(alias="minSources", ge=1)
    min_relevance: BoundedLevel = Field(alias="minRelevance")

    model_config = ConfigDict(populate_by_name=True)


class EvidenceSearchResult(BaseModel):
    evidence: list[Evidence]
    requirements: list[EvidenceRequirement]


class SearchProvider(Protocol):
    async def search(self, query: str, *, max_results: int) -> list[dict[str, Any]]: ...


class MockSearchProvider:
    def __init__(self, results: list[dict[str, Any]]) -> None:
        self._results = results

    async def search(self, query: str, *, max_results: int) -> list[dict[str, Any]]:
        del query
        return self._results[:max_results]


class TavilySearchProvider:
    def __init__(
        self,
        api_key: str,
        api_url: str = TAVILY_SEARCH_API_URL,
        timeout_seconds: float = 20,
        transport: httpx.AsyncBaseTransport | None = None,
    ) -> None:
        self._api_key = api_key.strip()
        self._api_url = api_url
        self._timeout_seconds = timeout_seconds
        self._transport = transport

    async def search(self, query: str, *, max_results: int) -> list[dict[str, Any]]:
        if not self._api_key:
            raise WorkflowError(
                ErrorCode.SEARCH_FAILURE, "Tavily API key is required for live search.", status_code=503
            )

        async with httpx.AsyncClient(timeout=self._timeout_seconds, transport=self._transport) as client:
            try:
                response = await client.post(
                    self._api_url,
                    headers={"Authorization": f"Bearer {self._api_key}"},
                    json={
                        "query": query,
                        "search_depth": "basic",
                        "topic": "news",
                        "include_answer": False,
                        "max_results": max_results,
                    },
                )
                response.raise_for_status()
                payload = response.json()
            except (httpx.HTTPError, ValueError) as exc:
                raise WorkflowError(ErrorCode.SEARCH_FAILURE, "Tavily search failed.", status_code=502) from exc

        results = payload.get("results") if isinstance(payload, dict) else None
        if not isinstance(results, list):
            raise WorkflowError(ErrorCode.SEARCH_FAILURE, "Tavily search response was malformed.", status_code=502)
        return [result for result in results if isinstance(result, dict)]


class EvidenceResearchTool:
    def __init__(self, provider: SearchProvider) -> None:
        self._provider = provider

    async def gather(self, query: str, *, max_results: int = 5) -> EvidenceSearchResult:
        normalized_query = query.strip()
        if not normalized_query:
            raise WorkflowError(ErrorCode.INVALID_INPUT, "Research query is required.", status_code=422)

        raw_results = await self._provider.search(normalized_query, max_results=max_results)
        return EvidenceSearchResult(
            evidence=normalize_search_results(raw_results),
            requirements=[
                EvidenceRequirement(
                    confidence=BoundedLevel.MEDIUM, min_sources=2, min_relevance=BoundedLevel.MEDIUM
                ),
                EvidenceRequirement(confidence=BoundedLevel.HIGH, min_sources=3, min_relevance=BoundedLevel.HIGH),
            ],
        )


def normalize_search_results(results: list[dict[str, Any]]) -> list[Evidence]:
    evidence: list[Evidence] = []
    seen_sources: set[str] = set()

    for result in results:
        title = _clean_text(result.get("title"))
        claim = _clean_text(result.get("content"))
        if title is None or claim is None:
            continue

        url = _clean_text(result.get("url"))
        dedupe_key = _source_key(title, url)
        if dedupe_key in seen_sources:
            continue
        seen_sources.add(dedupe_key)

        evidence.append(
            Evidence(
                claim=claim,
                source_title=title,
                source_url=url,
                context=_clean_text(result.get("domain")) or _clean_text(result.get("author")),
                source_published_at=_parse_datetime(result.get("published_date")),
                relevance=_relevance(result.get("score")),
            )
        )

    return evidence


def _clean_text(value: Any) -> str | None:
    if not isinstance(value, str):
        return None
    stripped = " ".join(value.split())
    return stripped or None


def _source_key(title: str, url: str | None) -> str:
    if url is not None:
        return url.removesuffix("/").lower()
    return title.lower()


def _relevance(score: Any) -> BoundedLevel:
    if not isinstance(score, int | float) or isinstance(score, bool) or score < 0 or score > 1:
        raise ValueError("Search result relevance score must be a number from 0 to 1.")
    if score >= 0.8:
        return BoundedLevel.HIGH
    if score >= 0.5:
        return BoundedLevel.MEDIUM
    return BoundedLevel.LOW


def _parse_datetime(value: Any) -> datetime | None:
    if not isinstance(value, str) or not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None

"""Replay a finished response as a paced stream of analysis events.

Used by demo mode so the frontend gets the same event shapes — and the same
animated experience — without any live provider dependencies.
"""

import asyncio
from collections.abc import AsyncIterator

from app.contracts.workflow import AgentRole, WorkflowResponse
from app.engine.events import (
    STAGE_HEADLINES,
    AnalysisCompleted,
    AnalysisEvent,
    EstimateUpdated,
    EvidenceAdded,
    MarketResolved,
    SettlementRiskFound,
    SourceFound,
    StageCompleted,
    StageStarted,
    WarningRaised,
)


async def replay(response: WorkflowResponse, *, pace_seconds: float) -> AsyncIterator[AnalysisEvent]:
    for entry in response.agent_trace:
        if entry.status == "skipped":
            yield StageCompleted(stage=entry.role, summary=entry.summary, status="skipped")
            continue

        yield StageStarted(stage=entry.role, display_name=entry.display_name, headline=STAGE_HEADLINES[entry.role])
        await asyncio.sleep(pace_seconds)
        for event in _stage_payload_events(entry.role, response):
            yield event
            await asyncio.sleep(pace_seconds / 2)
        yield StageCompleted(stage=entry.role, summary=entry.summary, status=entry.status)

    yield AnalysisCompleted(response=response)


def _stage_payload_events(role: AgentRole, response: WorkflowResponse) -> list[AnalysisEvent]:
    if role == AgentRole.MARKET_DATA:
        return [
            MarketResolved(market=response.market, kalshi=response.kalshi),
            EstimateUpdated(probability=response.kalshi.implied_probability, basis="market_prior"),
            *[WarningRaised(warning=warning) for warning in response.warnings],
        ]
    if role == AgentRole.SETTLEMENT_RULES:
        return [SettlementRiskFound(risk=risk) for risk in response.settlement_risks]
    if role == AgentRole.RESEARCH:
        events: list[AnalysisEvent] = []
        for item in response.evidence:
            events.append(
                SourceFound(
                    source_title=item.source_title,
                    source_url=item.source_url,
                    published_at=item.source_published_at,
                    relevance=item.relevance,
                )
            )
            events.append(EvidenceAdded(evidence=item))
        return events
    if role == AgentRole.PROBABILITY_ESTIMATOR:
        return [
            EstimateUpdated(
                probability=response.agent_estimate.probability,
                confidence=response.agent_estimate.confidence,
                basis="research_draft",
            )
        ]
    if role == AgentRole.SKEPTIC:
        return [
            EstimateUpdated(
                probability=response.agent_estimate.probability,
                confidence=response.agent_estimate.confidence,
                basis="skeptic_calibrated",
            )
        ]
    return []

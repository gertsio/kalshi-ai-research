"""Typed progress events streamed while an analysis runs.

The frontend animates directly off this contract: stages advancing, sources
appearing, the estimate converging, then the final validated response.
"""

from datetime import datetime
from typing import Annotated, Literal

from pydantic import AnyUrl, BaseModel, ConfigDict, Field

from app.contracts.workflow import (
    AgentRole,
    BoundedLevel,
    Evidence,
    KalshiSnapshot,
    Market,
    NonEmptyString,
    Probability,
    SettlementRisk,
    Warning,
    WorkflowResponse,
)
from app.core.errors import ErrorCode

EstimateBasis = Literal["market_prior", "research_draft", "skeptic_calibrated"]

STAGE_HEADLINES: dict[AgentRole, str] = {
    AgentRole.MARKET_DATA: "Resolving the event and its market context",
    AgentRole.SETTLEMENT_RULES: "Auditing settlement rules and cutoff wording",
    AgentRole.RESEARCH: "Searching public evidence",
    AgentRole.PROBABILITY_ESTIMATOR: "Converting evidence into a bounded estimate",
    AgentRole.SKEPTIC: "Stress-testing the draft estimate",
    AgentRole.MEMO_EDITOR: "Composing the validated research memo",
}


class _EventModel(BaseModel):
    model_config = ConfigDict(populate_by_name=True)


class StageStarted(_EventModel):
    type: Literal["stage_started"] = "stage_started"
    stage: AgentRole
    display_name: NonEmptyString = Field(alias="displayName")
    headline: NonEmptyString


class StageCompleted(_EventModel):
    type: Literal["stage_completed"] = "stage_completed"
    stage: AgentRole
    summary: NonEmptyString
    status: Literal["completed", "skipped", "failed"] = "completed"


class MarketResolved(_EventModel):
    type: Literal["market_resolved"] = "market_resolved"
    market: Market
    kalshi: KalshiSnapshot


class SourceFound(_EventModel):
    type: Literal["source_found"] = "source_found"
    source_title: NonEmptyString = Field(alias="sourceTitle")
    source_url: AnyUrl | None = Field(default=None, alias="sourceUrl")
    published_at: datetime | None = Field(default=None, alias="publishedAt")
    relevance: BoundedLevel


class EvidenceAdded(_EventModel):
    type: Literal["evidence_added"] = "evidence_added"
    evidence: Evidence


class SettlementRiskFound(_EventModel):
    type: Literal["settlement_risk_found"] = "settlement_risk_found"
    risk: SettlementRisk


class WarningRaised(_EventModel):
    type: Literal["warning_raised"] = "warning_raised"
    warning: Warning


class EstimateUpdated(_EventModel):
    type: Literal["estimate_updated"] = "estimate_updated"
    probability: Probability
    confidence: BoundedLevel | None = None
    basis: EstimateBasis


class AnalysisCompleted(_EventModel):
    type: Literal["final"] = "final"
    response: WorkflowResponse


class AnalysisFailed(_EventModel):
    type: Literal["error"] = "error"
    code: ErrorCode
    message: NonEmptyString
    status_code: int = Field(default=500, alias="statusCode")


AnalysisEvent = Annotated[
    StageStarted
    | StageCompleted
    | MarketResolved
    | SourceFound
    | EvidenceAdded
    | SettlementRiskFound
    | WarningRaised
    | EstimateUpdated
    | AnalysisCompleted
    | AnalysisFailed,
    Field(discriminator="type"),
]

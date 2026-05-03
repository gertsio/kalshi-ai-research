from datetime import datetime
from enum import StrEnum
from typing import Annotated, Literal

from pydantic import AnyUrl, BaseModel, ConfigDict, Field, StringConstraints, field_validator, model_validator

NonEmptyString = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]
Probability = Annotated[float, Field(ge=0, le=1)]


class BoundedLevel(StrEnum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class AgentRole(StrEnum):
    MARKET_DATA = "market_data"
    SETTLEMENT_RULES = "settlement_rules"
    RESEARCH = "research"
    PROBABILITY_ESTIMATOR = "probability_estimator"
    SKEPTIC = "skeptic"
    MEMO_EDITOR = "memo_editor"


class WorkflowRequest(BaseModel):
    market_input: NonEmptyString = Field(alias="marketInput")
    requested_at: datetime | None = Field(default=None, alias="requestedAt")
    demo_mode: bool | None = Field(default=None, alias="demoMode")

    model_config = ConfigDict(populate_by_name=True)


class Market(BaseModel):
    ticker: NonEmptyString
    title: NonEmptyString
    subtitle: str | None = None
    url: AnyUrl | None = None
    status: Literal["open", "closed", "settled", "unknown"]
    close_time: datetime | None = Field(default=None, alias="closeTime")
    settlement_source: NonEmptyString | None = Field(default=None, alias="settlementSource")

    model_config = ConfigDict(populate_by_name=True)


class KalshiSnapshot(BaseModel):
    implied_probability: Probability = Field(alias="impliedProbability")
    yes_bid: Probability | None = Field(default=None, alias="yesBid")
    yes_ask: Probability | None = Field(default=None, alias="yesAsk")
    spread: Probability | None = None
    volume: float | None = Field(default=None, ge=0)
    open_interest: float | None = Field(default=None, ge=0, alias="openInterest")
    last_updated_at: datetime | None = Field(default=None, alias="lastUpdatedAt")

    model_config = ConfigDict(populate_by_name=True)


class AgentEstimate(BaseModel):
    probability: Probability
    confidence: BoundedLevel
    thesis: NonEmptyString
    assumptions: list[NonEmptyString] = Field(min_length=1)


class Delta(BaseModel):
    probability_points: Annotated[float, Field(ge=-1, le=1)] = Field(alias="probabilityPoints")
    direction: Literal["agent_higher", "agent_lower", "in_line"]

    model_config = ConfigDict(populate_by_name=True)


class Evidence(BaseModel):
    claim: NonEmptyString
    source_title: NonEmptyString = Field(alias="sourceTitle")
    source_url: AnyUrl | None = Field(default=None, alias="sourceUrl")
    relevance: BoundedLevel

    model_config = ConfigDict(populate_by_name=True)


class SettlementRisk(BaseModel):
    risk: NonEmptyString
    severity: BoundedLevel


class Warning(BaseModel):
    kind: Literal["liquidity", "staleness", "data_quality"]
    message: NonEmptyString
    severity: BoundedLevel


class AgentTraceEntry(BaseModel):
    role: AgentRole
    display_name: NonEmptyString = Field(alias="displayName")
    summary: NonEmptyString
    status: Literal["completed", "skipped", "failed"]

    model_config = ConfigDict(populate_by_name=True)


class DeveloperOptions(BaseModel):
    raw_json_inspection_enabled: bool = Field(alias="rawJsonInspectionEnabled")
    raw_json_label: NonEmptyString = Field(alias="rawJsonLabel")

    model_config = ConfigDict(populate_by_name=True)


class WorkflowResponse(BaseModel):
    schema_version: Literal["1.0"] = Field(alias="schemaVersion")
    analyzed_at: datetime = Field(alias="analyzedAt")
    market: Market
    kalshi: KalshiSnapshot
    agent_estimate: AgentEstimate = Field(alias="agentEstimate")
    delta: Delta
    evidence: list[Evidence]
    counterarguments: list[NonEmptyString]
    settlement_risks: list[SettlementRisk] = Field(alias="settlementRisks")
    warnings: list[Warning]
    what_would_change: list[NonEmptyString] = Field(alias="whatWouldChange", min_length=1)
    agent_trace: list[AgentTraceEntry] = Field(alias="agentTrace")
    final_memo_markdown: NonEmptyString = Field(alias="finalMemoMarkdown")
    developer: DeveloperOptions
    disclaimer: NonEmptyString

    model_config = ConfigDict(populate_by_name=True)

    @model_validator(mode="after")
    def validate_response_contract(self) -> "WorkflowResponse":
        expected_delta = self.agent_estimate.probability - self.kalshi.implied_probability
        if abs(self.delta.probability_points - expected_delta) > 0.000001:
            raise ValueError("Delta must equal agent estimate minus Kalshi implied probability.")

        if abs(expected_delta) <= 0.000001:
            expected_direction = "in_line"
        else:
            expected_direction = "agent_higher" if expected_delta > 0 else "agent_lower"
        if self.delta.direction != expected_direction:
            raise ValueError("Delta direction must match the signed probability delta.")

        roles = {entry.role for entry in self.agent_trace}
        missing_roles = set(AgentRole) - roles
        if missing_roles:
            missing = ", ".join(sorted(role.value for role in missing_roles))
            raise ValueError(f"Agent trace must include {missing}.")

        return self

    @field_validator("disclaimer")
    @classmethod
    def disclaimer_separates_research_from_advice(cls, value: str) -> str:
        lowered = value.lower()
        has_research_boundary = "research" in lowered or "informational" in lowered
        rejects_advice = any(
            phrase in lowered for phrase in ("not financial advice", "not trading advice", "not advice")
        )
        rejects_trade = any(phrase in lowered for phrase in ("not a recommendation", "not trade", "place any trade"))
        if not (has_research_boundary and rejects_advice and rejects_trade):
            raise ValueError("Disclaimer must clearly separate research from trading advice.")
        return value

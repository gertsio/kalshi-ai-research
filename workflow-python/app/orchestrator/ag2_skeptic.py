import json
from typing import Any, Protocol

from pydantic import BaseModel, ConfigDict, Field

from app.contracts.workflow import BoundedLevel, Delta, Evidence, SettlementRisk, Warning
from app.core.config import GOOGLE_GEMINI_BASE_URL, OPENROUTER_BASE_URL
from app.core.errors import ErrorCode, WorkflowError
from app.tools.probability_scoring import ProbabilityScoringResult


class SkepticCalibrator(Protocol):
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
    ) -> ProbabilityScoringResult: ...


class SkepticCalibration(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    probability: float = Field(ge=0, le=1, description="Final calibrated event probability from 0 to 1.")
    confidence: BoundedLevel = Field(description="Confidence after reviewing evidence quality and contradictions.")
    thesis: str = Field(min_length=1, description="Research-only thesis explaining the calibrated estimate.")
    assumptions: list[str] = Field(min_length=1, description="Assumptions that must hold for this estimate.")
    counterarguments: list[str] = Field(
        default_factory=list,
        description="Counterarguments and reasons the draft could be wrong.",
    )
    what_would_change: list[str] = Field(
        min_length=1,
        description="Evidence or settlement changes that would move the estimate.",
        alias="whatWouldChange",
    )
    critique_summary: str = Field(
        min_length=1,
        description="Short note on whether the draft was revised and why.",
        alias="critiqueSummary",
    )


class Ag2SkepticCalibrator:
    def __init__(self, *, api_key: str, model: str, base_url: str) -> None:
        self._api_key = api_key.strip()
        self._model = model.strip()
        self._base_url = base_url.rstrip("/")

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
        if not self._api_key:
            raise WorkflowError(ErrorCode.MODEL_FAILURE, "AG2 model API key is required.", status_code=503)

        try:
            from autogen.beta import Agent, PromptedSchema
        except ImportError as exc:
            raise WorkflowError(
                ErrorCode.MODEL_FAILURE,
                "AG2 is not installed for live calibration.",
                status_code=503,
            ) from exc

        agent = Agent(
            "skeptic_calibrator",
            prompt=(
                "You are a Kalshi research skeptic/calibrator. Challenge overconfidence, thin evidence, "
                "contradictions, settlement ambiguity, and liquidity warnings. Keep output research-only. "
                "Never recommend buying, selling, placing trades, or taking positions."
            ),
            config=self._config(),
            response_schema=PromptedSchema(SkepticCalibration),
        )
        try:
            reply = await agent.ask(
                _prompt(
                    market_title=market_title,
                    market_ticker=market_ticker,
                    kalshi_implied_probability=kalshi_implied_probability,
                    draft=draft,
                    evidence=evidence,
                    settlement_risks=settlement_risks,
                    warnings=warnings,
                )
            )
            calibration = await _content_or_body(reply)
            if calibration is None:
                raise ValueError("AG2 returned empty calibration output.")
        except WorkflowError:
            raise
        except Exception as exc:
            raise WorkflowError(ErrorCode.MODEL_FAILURE, "AG2 skeptic calibration failed.", status_code=502) from exc

        probability_points = calibration.probability - kalshi_implied_probability
        return draft.model_copy(
            update={
                "probability": calibration.probability,
                "confidence": calibration.confidence,
                "thesis": calibration.thesis,
                "assumptions": calibration.assumptions,
                "delta": Delta(probability_points=probability_points, direction=_direction(probability_points)),
                "counterarguments": calibration.counterarguments or draft.counterarguments,
                "what_would_change": [
                    *calibration.what_would_change,
                    f"AG2 skeptic calibration: {calibration.critique_summary}",
                ],
            }
        )

    def _config(self) -> Any:
        if self._base_url == OPENROUTER_BASE_URL or self._api_key.startswith("sk-or-"):
            from autogen.beta.config import OpenAIConfig

            return OpenAIConfig(model=self._model, base_url=self._base_url, api_key=self._api_key, streaming=True)

        if self._base_url == GOOGLE_GEMINI_BASE_URL:
            from autogen.beta.config import GeminiConfig

            return GeminiConfig(model=self._model, api_key=self._api_key, streaming=True)

        from autogen.beta.config import OpenAIConfig

        return OpenAIConfig(model=self._model, base_url=self._base_url, api_key=self._api_key, streaming=True)


def _prompt(
    *,
    market_title: str,
    market_ticker: str,
    kalshi_implied_probability: float,
    draft: ProbabilityScoringResult,
    evidence: list[Evidence],
    settlement_risks: list[SettlementRisk],
    warnings: list[Warning],
) -> str:
    return json.dumps(
        {
            "instruction": (
                "Review the draft probability as a skeptical calibrator. Revise only when evidence quality, "
                "contradictions, settlement risk, or market warnings justify it. High confidence requires strong, "
                "multiple, directly relevant evidence and low ambiguity. Return only structured output."
            ),
            "market": {"ticker": market_ticker, "title": market_title},
            "kalshiImpliedProbability": kalshi_implied_probability,
            "draft": draft.model_dump(mode="json", by_alias=True),
            "evidence": [item.model_dump(mode="json", by_alias=True) for item in evidence],
            "settlementRisks": [item.model_dump(mode="json", by_alias=True) for item in settlement_risks],
            "warnings": [item.model_dump(mode="json", by_alias=True) for item in warnings],
        }
    )


def _direction(probability_points: float) -> str:
    if abs(probability_points) <= 0.000001:
        return "in_line"
    return "agent_higher" if probability_points > 0 else "agent_lower"


async def _content_or_body(reply: Any) -> SkepticCalibration | None:
    try:
        return SkepticCalibration.model_validate_json(_json_object(reply.body))
    except Exception as body_error:
        raw_body_error = body_error

    try:
        calibration = await reply.content(retries=2)
        if calibration is not None and not isinstance(calibration, SkepticCalibration):
            raise TypeError("AG2 returned an unexpected structured output type.")
        return calibration
    except Exception as content_error:
        try:
            return SkepticCalibration.model_validate_json(_json_object(reply.body))
        except Exception as body_error:
            del content_error, raw_body_error
            raise ValueError("AG2 reply did not match skeptic calibration schema.") from body_error


def _json_object(value: str) -> str:
    text = value.strip()
    if text.startswith("```"):
        lines = text.splitlines()
        if lines and lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines).strip()

    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end == -1 or end < start:
        raise ValueError("AG2 reply did not contain a JSON object.")
    return text[start : end + 1]

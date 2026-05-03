import json
from typing import Any

import httpx

from app.contracts.workflow import BoundedLevel, Delta, Evidence, SettlementRisk, Warning
from app.core.errors import ErrorCode, WorkflowError
from app.tools.probability_scoring import ProbabilityScoringResult, score_probability

GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta"


class GeminiProbabilityTool:
    def __init__(
        self,
        api_key: str,
        *,
        model: str = "gemini-2.5-flash",
        base_url: str = GEMINI_API_BASE_URL,
        timeout_seconds: float = 30,
        transport: httpx.AsyncBaseTransport | None = None,
    ) -> None:
        self._api_key = api_key.strip()
        self._model = model.strip()
        self._base_url = base_url.rstrip("/")
        self._timeout_seconds = timeout_seconds
        self._transport = transport

    async def score(
        self,
        *,
        market_title: str,
        market_ticker: str,
        kalshi_implied_probability: float,
        evidence: list[Evidence],
        settlement_risks: list[SettlementRisk],
        warnings: list[Warning],
    ) -> ProbabilityScoringResult:
        if not self._api_key:
            raise WorkflowError(
                ErrorCode.MODEL_FAILURE, "Gemini API key is required for live scoring.", status_code=503
            )
        if self._api_key.startswith("sk-or-") and not _is_openai_compatible(self._base_url):
            raise WorkflowError(
                ErrorCode.MODEL_FAILURE,
                "OpenRouter API keys require WORKFLOW_GEMINI_BASE_URL=https://openrouter.ai/api/v1.",
                status_code=503,
            )

        prompt = _prompt(
            market_title=market_title,
            market_ticker=market_ticker,
            kalshi_implied_probability=kalshi_implied_probability,
            evidence=evidence,
            settlement_risks=settlement_risks,
            warnings=warnings,
        )
        async with httpx.AsyncClient(timeout=self._timeout_seconds, transport=self._transport) as client:
            try:
                response = await self._post_model_request(client, prompt)
                response.raise_for_status()
                payload = response.json()
            except (httpx.HTTPError, ValueError) as exc:
                raise WorkflowError(ErrorCode.MODEL_FAILURE, "Gemini scoring failed.", status_code=502) from exc

        try:
            parsed = json.loads(_candidate_text(payload))
            probability = float(parsed["probability"])
            probability_points = probability - kalshi_implied_probability
            return score_probability(
                kalshi_implied_probability=kalshi_implied_probability,
                evidence=evidence,
                settlement_risks=settlement_risks,
                counterarguments=parsed["counterarguments"],
                warnings=warnings,
            ).model_copy(
                update={
                    "probability": probability,
                    "confidence": BoundedLevel(parsed["confidence"]),
                    "thesis": parsed["thesis"],
                    "assumptions": parsed["assumptions"],
                    "delta": Delta(probability_points=probability_points, direction=_direction(probability_points)),
                    "what_would_change": parsed["whatWouldChange"],
                }
            )
        except (KeyError, TypeError, ValueError, json.JSONDecodeError) as exc:
            raise WorkflowError(
                ErrorCode.MODEL_FAILURE, "Gemini returned invalid scoring JSON.", status_code=502
            ) from exc

    async def _post_model_request(self, client: httpx.AsyncClient, prompt: str) -> httpx.Response:
        if _is_openai_compatible(self._base_url):
            return await client.post(
                f"{self._base_url}/chat/completions",
                headers={"Authorization": f"Bearer {self._api_key}"},
                json={
                    "model": self._model,
                    "messages": [{"role": "user", "content": prompt}],
                    "response_format": {
                        "type": "json_schema",
                        "json_schema": {"name": "probability", "schema": _response_schema()},
                    },
                    "max_tokens": 1024,
                },
            )

        return await client.post(
            f"{self._base_url}/models/{self._model}:generateContent",
            headers={"x-goog-api-key": self._api_key},
            json={
                "contents": [{"role": "user", "parts": [{"text": prompt}]}],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseJsonSchema": _response_schema(),
                },
            },
        )


def _prompt(
    *,
    market_title: str,
    market_ticker: str,
    kalshi_implied_probability: float,
    evidence: list[Evidence],
    settlement_risks: list[SettlementRisk],
    warnings: list[Warning],
) -> str:
    return json.dumps(
        {
            "instruction": (
                "Produce research-only probability analysis for a Kalshi market. Do not recommend buying, selling, "
                "placing trades, or taking positions. Return only JSON matching the schema."
            ),
            "market": {"ticker": market_ticker, "title": market_title},
            "kalshiImpliedProbability": kalshi_implied_probability,
            "evidence": [item.model_dump(mode="json") for item in evidence],
            "settlementRisks": [item.model_dump(mode="json") for item in settlement_risks],
            "warnings": [item.model_dump(mode="json") for item in warnings],
        }
    )


def _response_schema() -> dict[str, Any]:
    return {
        "type": "object",
        "properties": {
            "probability": {"type": "number", "minimum": 0, "maximum": 1},
            "confidence": {"type": "string", "enum": ["low", "medium", "high"]},
            "thesis": {"type": "string"},
            "assumptions": {"type": "array", "items": {"type": "string"}, "minItems": 1},
            "counterarguments": {"type": "array", "items": {"type": "string"}},
            "whatWouldChange": {"type": "array", "items": {"type": "string"}, "minItems": 1},
        },
        "required": ["probability", "confidence", "thesis", "assumptions", "counterarguments", "whatWouldChange"],
        "propertyOrdering": [
            "probability",
            "confidence",
            "thesis",
            "assumptions",
            "counterarguments",
            "whatWouldChange",
        ],
    }


def _candidate_text(payload: Any) -> str:
    if isinstance(payload, dict) and "choices" in payload:
        text = payload["choices"][0]["message"]["content"]
        if not isinstance(text, str):
            raise ValueError("OpenAI-compatible response did not include text.")
        return text

    candidates = payload["candidates"]
    text = candidates[0]["content"]["parts"][0]["text"]
    if not isinstance(text, str):
        raise ValueError("Gemini response did not include text.")
    return text


def _is_openai_compatible(base_url: str) -> bool:
    return "openrouter.ai" in base_url or base_url.rstrip("/").endswith("/v1")


def _direction(probability_points: float) -> str:
    if abs(probability_points) <= 0.000001:
        return "in_line"
    return "agent_higher" if probability_points > 0 else "agent_lower"

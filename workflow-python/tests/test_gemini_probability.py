import httpx
import pytest

from app.contracts.workflow import BoundedLevel
from app.core.errors import ErrorCode, WorkflowError
from app.tools.gemini_probability import GeminiProbabilityTool


@pytest.mark.asyncio
async def test_openrouter_key_requires_openai_compatible_base_url() -> None:
    tool = GeminiProbabilityTool("sk-or-test")

    with pytest.raises(WorkflowError) as error:
        await tool.score(
            market_title="Example market",
            market_ticker="KXEXAMPLE-26",
            kalshi_implied_probability=0.5,
            evidence=[],
            settlement_risks=[],
            warnings=[],
        )

    assert error.value.code == ErrorCode.MODEL_FAILURE
    assert error.value.status_code == 503
    assert "OpenRouter API keys require" in error.value.message


@pytest.mark.asyncio
async def test_google_gemini_key_is_sent_in_header_not_url() -> None:
    captured_request: httpx.Request | None = None

    async def handler(request: httpx.Request) -> httpx.Response:
        nonlocal captured_request
        captured_request = request
        return httpx.Response(
            200,
            json={
                "candidates": [
                    {
                        "content": {
                            "parts": [
                                {
                                    "text": '{"probability":0.55,"confidence":"medium","thesis":"Balanced case.","assumptions":["Court timing remains unchanged."],"counterarguments":[],"whatWouldChange":["New docket activity."]}'
                                }
                            ]
                        }
                    }
                ]
            },
        )

    tool = GeminiProbabilityTool("google-key", transport=httpx.MockTransport(handler))

    result = await tool.score(
        market_title="Example market",
        market_ticker="KXEXAMPLE-26",
        kalshi_implied_probability=0.5,
        evidence=[],
        settlement_risks=[],
        warnings=[],
    )

    assert result.confidence == BoundedLevel.MEDIUM
    assert captured_request is not None
    assert captured_request.url.params.get("key") is None
    assert captured_request.headers["x-goog-api-key"] == "google-key"

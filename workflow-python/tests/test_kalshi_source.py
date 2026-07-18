import pytest

from app.core.errors import ErrorCode, WorkflowError
from app.sources.kalshi import KalshiEventSource, normalize_market_input


@pytest.mark.parametrize(
    ("event_input", "expected"),
    [
        ("KXEXAMPLE-26MAY03-DEMO", "KXEXAMPLE-26MAY03-DEMO"),
        ("kxexample-26may03-demo", "KXEXAMPLE-26MAY03-DEMO"),
        ("  kxexample-26may03-demo  ", "KXEXAMPLE-26MAY03-DEMO"),
        ("https://kalshi.com/markets/KXEXAMPLE-26MAY03-DEMO", "KXEXAMPLE-26MAY03-DEMO"),
        ("https://www.kalshi.com/markets/kxexample-26may03-demo", "KXEXAMPLE-26MAY03-DEMO"),
        ("https://kalshi.com/markets/kxparent/kxexample-26may03-demo", "KXEXAMPLE-26MAY03-DEMO"),
        ("https://kalshi.com/markets/KXEXAMPLE-26MAY03-DEMO?ref=share", "KXEXAMPLE-26MAY03-DEMO"),
    ],
)
def test_normalize_market_input_accepts_tickers_and_kalshi_urls(event_input: str, expected: str) -> None:
    assert normalize_market_input(event_input) == expected


@pytest.mark.parametrize(
    "event_input",
    [
        "",
        "   ",
        "not a ticker",
        "AB",
        "https://example.com/markets/KXEXAMPLE-26MAY03-DEMO",
        "https://kalshi.com/help/KXEXAMPLE-26MAY03-DEMO",
        "https://kalshi.com/markets/",
    ],
)
def test_normalize_market_input_rejects_non_kalshi_inputs(event_input: str) -> None:
    assert normalize_market_input(event_input) is None


@pytest.mark.asyncio
async def test_kalshi_event_source_rejects_unresolvable_input_with_typed_error() -> None:
    source = KalshiEventSource()

    with pytest.raises(WorkflowError) as error:
        await source.resolve("definitely not a market")

    assert error.value.code == ErrorCode.INVALID_INPUT
    assert error.value.status_code == 422

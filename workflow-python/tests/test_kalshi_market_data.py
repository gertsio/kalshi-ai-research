from datetime import UTC, datetime
from typing import Any

import httpx
import pytest

from app.tools.kalshi_market_data import KalshiPublicMarketDataTool


def _market(**overrides: Any) -> dict[str, Any]:
    market = {
        "ticker": "KXEXAMPLE-26MAY03-DEMO",
        "title": "Will the demo event happen?",
        "subtitle": "Demo event",
        "status": "active",
        "close_time": "2026-05-04T00:00:00Z",
        "yes_bid_dollars": "0.4200",
        "yes_ask_dollars": "0.4600",
        "last_price_dollars": "0.4300",
        "yes_bid_size_fp": "75.00",
        "yes_ask_size_fp": "80.00",
        "volume_fp": "1200.00",
        "open_interest_fp": "400.00",
        "rules_primary": "Official source named in market rules.",
    }
    market.update(overrides)
    return {"market": market}


def _orderbook(**overrides: Any) -> dict[str, Any]:
    orderbook = {
        "yes_dollars": [["0.0100", "200.00"], ["0.4200", "75.00"]],
        "no_dollars": [["0.0100", "150.00"], ["0.5400", "80.00"]],
    }
    orderbook.update(overrides)
    return {"orderbook_fp": orderbook}


def _tool(fixtures: dict[str, dict[str, Any]]) -> tuple[KalshiPublicMarketDataTool, list[httpx.Request]]:
    requests: list[httpx.Request] = []

    def handler(request: httpx.Request) -> httpx.Response:
        requests.append(request)
        assert "authorization" not in request.headers
        assert "/portfolio/" not in request.url.path
        assert "/orders" not in request.url.path
        return httpx.Response(200, json=fixtures[request.url.path])

    return KalshiPublicMarketDataTool(base_url="https://kalshi.test", transport=httpx.MockTransport(handler)), requests


@pytest.mark.asyncio
async def test_fetches_public_market_data_with_orderbook_summary() -> None:
    tool, requests = _tool(
        {
            "/markets/KXEXAMPLE-26MAY03-DEMO": _market(),
            "/markets/KXEXAMPLE-26MAY03-DEMO/orderbook": _orderbook(),
        }
    )

    result = await tool.fetch("kxexample-26may03-demo", now=datetime(2026, 5, 3, tzinfo=UTC))

    assert [request.url.path for request in requests] == [
        "/markets/KXEXAMPLE-26MAY03-DEMO",
        "/markets/KXEXAMPLE-26MAY03-DEMO/orderbook",
    ]
    assert result.market.ticker == "KXEXAMPLE-26MAY03-DEMO"
    assert result.market.title == "Will the demo event happen?"
    assert result.market.status == "open"
    assert result.implied_probability == 0.44
    assert result.prices.yes_bid == 0.42
    assert result.prices.yes_ask == 0.46
    assert result.prices.spread == pytest.approx(0.04)
    assert result.volume == 1200
    assert result.open_interest == 400
    assert result.orderbook is not None
    assert result.orderbook.yes_bid_levels == 2
    assert result.orderbook.best_yes_bid is not None
    assert result.orderbook.best_yes_bid.contracts == 75
    assert result.warnings == []


@pytest.mark.asyncio
async def test_missing_orderbook_data_does_not_crash_and_warns() -> None:
    tool, _requests = _tool(
        {
            "/markets/KXEXAMPLE-26MAY03-DEMO": _market(),
            "/markets/KXEXAMPLE-26MAY03-DEMO/orderbook": {"orderbook_fp": {"yes_dollars": [], "no_dollars": []}},
        }
    )

    result = await tool.fetch("KXEXAMPLE-26MAY03-DEMO", now=datetime(2026, 5, 3, tzinfo=UTC))

    assert result.orderbook is not None
    assert result.orderbook.yes_bid_levels == 0
    assert {warning.kind for warning in result.warnings} == {"liquidity"}


@pytest.mark.asyncio
async def test_thin_liquidity_warning_uses_volume_and_top_of_book() -> None:
    tool, _requests = _tool(
        {
            "/markets/KXEXAMPLE-26MAY03-DEMO": _market(volume_fp="25.00", yes_bid_size_fp="4.00"),
            "/markets/KXEXAMPLE-26MAY03-DEMO/orderbook": _orderbook(),
        }
    )

    result = await tool.fetch("KXEXAMPLE-26MAY03-DEMO", now=datetime(2026, 5, 3, tzinfo=UTC))

    assert any(warning.kind == "liquidity" for warning in result.warnings)


@pytest.mark.asyncio
async def test_crossed_quote_does_not_fail_validation_and_warns() -> None:
    tool, _requests = _tool(
        {
            "/markets/KXEXAMPLE-26MAY03-DEMO": _market(yes_bid_dollars="0.6200", yes_ask_dollars="0.5800"),
            "/markets/KXEXAMPLE-26MAY03-DEMO/orderbook": _orderbook(),
        }
    )

    result = await tool.fetch("KXEXAMPLE-26MAY03-DEMO", now=datetime(2026, 5, 3, tzinfo=UTC))

    assert result.implied_probability == 0.6
    assert result.prices.spread is None
    assert any(warning.kind == "liquidity" for warning in result.warnings)


@pytest.mark.asyncio
async def test_stale_market_warning_uses_status_and_close_time() -> None:
    tool, _requests = _tool(
        {
            "/markets/KXEXAMPLE-26MAY03-DEMO": _market(status="closed", close_time="2026-05-02T00:00:00Z"),
            "/markets/KXEXAMPLE-26MAY03-DEMO/orderbook": _orderbook(),
        }
    )

    result = await tool.fetch("KXEXAMPLE-26MAY03-DEMO", now=datetime(2026, 5, 3, tzinfo=UTC))

    assert any(warning.kind == "staleness" and warning.severity == "high" for warning in result.warnings)

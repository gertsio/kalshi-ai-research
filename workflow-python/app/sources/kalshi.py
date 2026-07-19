"""Kalshi event source: accepts a ticker or kalshi.com market URL."""

import re
from datetime import datetime
from urllib.parse import urlsplit

from app.core.errors import ErrorCode, WorkflowError
from app.tools.kalshi_market_data import KalshiPublicMarketDataTool, PublicMarketData

TICKER_PATTERN = re.compile(r"^KX[A-Z0-9-]{3,}$")
KALSHI_HOST_PATTERN = re.compile(r"(^|\.)kalshi\.com$", re.IGNORECASE)


class KalshiEventSource:
    def __init__(self, market_data_tool: KalshiPublicMarketDataTool | None = None) -> None:
        self._market_data_tool = market_data_tool or KalshiPublicMarketDataTool()

    async def resolve(self, event_input: str, *, now: datetime | None = None) -> PublicMarketData:
        ticker = normalize_market_input(event_input)
        if ticker is None:
            raise WorkflowError(
                ErrorCode.INVALID_INPUT,
                "Enter a Kalshi market ticker (KX…) or a kalshi.com market URL.",
                status_code=422,
            )
        return await self._market_data_tool.fetch(ticker, now=now)


def normalize_market_input(event_input: str) -> str | None:
    trimmed = event_input.strip()
    if not trimmed:
        return None

    from_url = _ticker_from_url(trimmed)
    if from_url is not None:
        return from_url

    ticker = trimmed.upper()
    return ticker if TICKER_PATTERN.fullmatch(ticker) else None


def _ticker_from_url(value: str) -> str | None:
    parts = urlsplit(value)
    if parts.scheme not in {"http", "https"} or not KALSHI_HOST_PATTERN.search(parts.hostname or ""):
        return None

    segments = [segment for segment in parts.path.split("/") if segment]
    try:
        market_index = next(index for index, segment in enumerate(segments) if segment.lower() == "markets")
    except StopIteration:
        return None

    candidates = [
        segment.upper() for segment in segments[market_index + 1 :] if TICKER_PATTERN.fullmatch(segment.upper())
    ]
    return candidates[-1] if candidates else None

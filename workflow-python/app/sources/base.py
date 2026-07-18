"""Source-agnostic seam between user input and a researchable event.

An EventSource turns whatever the user typed into resolved market data the
engine can analyze. Kalshi is the first implementation; a free-text event
resolver becomes another implementation without touching the engine loop.
"""

from datetime import datetime
from typing import Protocol

from app.tools.kalshi_market_data import PublicMarketData


class EventSource(Protocol):
    async def resolve(self, event_input: str, *, now: datetime | None = None) -> PublicMarketData: ...

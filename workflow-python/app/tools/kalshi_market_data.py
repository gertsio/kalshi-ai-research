from datetime import UTC, datetime
from decimal import Decimal, InvalidOperation
from typing import Any, Literal

import httpx
from pydantic import AnyUrl, BaseModel, ConfigDict, Field

from app.contracts.workflow import BoundedLevel, NonEmptyString, Probability, Warning
from app.core.errors import ErrorCode, WorkflowError

KALSHI_PUBLIC_API_BASE_URL = "https://api.elections.kalshi.com/trade-api/v2"
THIN_TOP_OF_BOOK_CONTRACTS = Decimal("20")
THIN_VOLUME_CONTRACTS = Decimal("100")


class MarketMetadata(BaseModel):
    ticker: NonEmptyString
    title: NonEmptyString
    subtitle: str | None = None
    url: AnyUrl | None = None
    status: Literal["open", "closed", "settled", "unknown"]
    close_time: datetime | None = Field(default=None, alias="closeTime")
    settlement_source: str | None = Field(default=None, alias="settlementSource")

    model_config = ConfigDict(populate_by_name=True)


class PriceContext(BaseModel):
    yes_bid: Probability | None = Field(default=None, alias="yesBid")
    yes_ask: Probability | None = Field(default=None, alias="yesAsk")
    last_price: Probability | None = Field(default=None, alias="lastPrice")
    spread: Probability | None = None

    model_config = ConfigDict(populate_by_name=True)


class OrderbookLevel(BaseModel):
    price: Probability
    contracts: float = Field(ge=0)


class OrderbookSummary(BaseModel):
    yes_bid_levels: int = Field(alias="yesBidLevels", ge=0)
    no_bid_levels: int = Field(alias="noBidLevels", ge=0)
    best_yes_bid: OrderbookLevel | None = Field(default=None, alias="bestYesBid")
    best_no_bid: OrderbookLevel | None = Field(default=None, alias="bestNoBid")

    model_config = ConfigDict(populate_by_name=True)


class PublicMarketData(BaseModel):
    market: MarketMetadata
    implied_probability: Probability = Field(alias="impliedProbability")
    prices: PriceContext
    volume: float | None = Field(default=None, ge=0)
    open_interest: float | None = Field(default=None, ge=0, alias="openInterest")
    orderbook: OrderbookSummary | None = None
    warnings: list[Warning]

    model_config = ConfigDict(populate_by_name=True)


class KalshiPublicMarketDataTool:
    def __init__(
        self,
        base_url: str = KALSHI_PUBLIC_API_BASE_URL,
        timeout_seconds: float = 10,
        transport: httpx.AsyncBaseTransport | None = None,
    ) -> None:
        self._base_url = base_url.rstrip("/")
        self._timeout_seconds = timeout_seconds
        self._transport = transport

    async def fetch(self, ticker: str, *, now: datetime | None = None) -> PublicMarketData:
        normalized_ticker = ticker.strip().upper()
        if not normalized_ticker:
            raise WorkflowError(ErrorCode.INVALID_INPUT, "Market ticker is required.", status_code=422)

        async with httpx.AsyncClient(
            base_url=self._base_url, timeout=self._timeout_seconds, transport=self._transport
        ) as client:
            market_payload = await self._get_json(client, f"/markets/{normalized_ticker}")
            orderbook_payload = await self._get_optional_json(client, f"/markets/{normalized_ticker}/orderbook")

        market = market_payload.get("market", market_payload)
        if not isinstance(market, dict):
            raise WorkflowError(
                ErrorCode.MARKET_DATA_UNAVAILABLE, "Kalshi market response was malformed.", status_code=502
            )

        orderbook = _summarize_orderbook(orderbook_payload)
        prices = _price_context(market)
        close_time = _parse_datetime(market.get("close_time"))
        volume = _fixed_point_count(market.get("volume_fp") or market.get("volume"))
        open_interest = _fixed_point_count(market.get("open_interest_fp") or market.get("open_interest"))
        implied_probability = _implied_probability(prices)
        warnings = _warnings(market, prices, orderbook, close_time, volume, now or datetime.now(UTC))

        return PublicMarketData(
            market=MarketMetadata(
                ticker=str(market.get("ticker") or normalized_ticker),
                title=str(market.get("title") or market.get("yes_sub_title") or normalized_ticker),
                subtitle=market.get("subtitle") or market.get("yes_sub_title"),
                url=f"https://kalshi.com/markets/{normalized_ticker}",
                status=_status(market.get("status")),
                closeTime=close_time,
                settlementSource=market.get("rules_primary"),
            ),
            implied_probability=implied_probability,
            prices=prices,
            volume=float(volume) if volume is not None else None,
            openInterest=float(open_interest) if open_interest is not None else None,
            orderbook=orderbook,
            warnings=warnings,
        )

    async def _get_json(self, client: httpx.AsyncClient, path: str) -> dict[str, Any]:
        try:
            response = await client.get(path)
            response.raise_for_status()
            payload = response.json()
        except (httpx.HTTPError, ValueError) as exc:
            raise WorkflowError(
                ErrorCode.MARKET_DATA_UNAVAILABLE, "Kalshi market data was unavailable.", status_code=502
            ) from exc
        if not isinstance(payload, dict):
            raise WorkflowError(
                ErrorCode.MARKET_DATA_UNAVAILABLE, "Kalshi market response was malformed.", status_code=502
            )
        return payload

    async def _get_optional_json(self, client: httpx.AsyncClient, path: str) -> dict[str, Any] | None:
        try:
            return await self._get_json(client, path)
        except WorkflowError:
            return None


def _price_context(market: dict[str, Any]) -> PriceContext:
    yes_bid = _probability(market.get("yes_bid_dollars") or market.get("yes_bid"))
    yes_ask = _probability(market.get("yes_ask_dollars") or market.get("yes_ask"))
    last_price = _probability(market.get("last_price_dollars") or market.get("last_price"))
    raw_spread = yes_ask - yes_bid if yes_bid is not None and yes_ask is not None else None
    spread = raw_spread if raw_spread is None or raw_spread >= 0 else None
    return PriceContext(yesBid=yes_bid, yesAsk=yes_ask, lastPrice=last_price, spread=spread)


def _implied_probability(prices: PriceContext) -> float:
    if prices.yes_bid is not None and prices.yes_ask is not None:
        return (prices.yes_bid + prices.yes_ask) / 2
    if prices.last_price is not None:
        return prices.last_price
    if prices.yes_bid is not None:
        return prices.yes_bid
    if prices.yes_ask is not None:
        return prices.yes_ask
    raise WorkflowError(
        ErrorCode.MARKET_DATA_UNAVAILABLE, "Kalshi market did not include usable price data.", status_code=502
    )


def _summarize_orderbook(payload: dict[str, Any] | None) -> OrderbookSummary | None:
    if not payload:
        return None
    orderbook = payload.get("orderbook_fp") or payload.get("orderbook") or payload
    if not isinstance(orderbook, dict):
        return None
    yes_levels = _levels(orderbook.get("yes_dollars") or orderbook.get("yes") or [])
    no_levels = _levels(orderbook.get("no_dollars") or orderbook.get("no") or [])
    return OrderbookSummary(
        yes_bid_levels=len(yes_levels),
        no_bid_levels=len(no_levels),
        bestYesBid=yes_levels[-1] if yes_levels else None,
        bestNoBid=no_levels[-1] if no_levels else None,
    )


def _levels(raw_levels: Any) -> list[OrderbookLevel]:
    if not isinstance(raw_levels, list):
        return []
    levels = []
    for raw_level in raw_levels:
        if not isinstance(raw_level, list | tuple) or len(raw_level) < 2:
            continue
        price = _probability(raw_level[0])
        contracts = _fixed_point_count(raw_level[1])
        if price is None or contracts is None:
            continue
        levels.append(OrderbookLevel(price=price, contracts=float(contracts)))
    return sorted(levels, key=lambda level: level.price)


def _warnings(
    market: dict[str, Any],
    prices: PriceContext,
    orderbook: OrderbookSummary | None,
    close_time: datetime | None,
    volume: Decimal | None,
    now: datetime,
) -> list[Warning]:
    warnings: list[Warning] = []
    top_sizes = [
        _fixed_point_count(market.get("yes_bid_size_fp")),
        _fixed_point_count(market.get("yes_ask_size_fp")),
    ]
    thin_top = any(size is not None and size < THIN_TOP_OF_BOOK_CONTRACTS for size in top_sizes)
    thin_volume = volume is not None and volume < THIN_VOLUME_CONTRACTS
    missing_book = orderbook is None or (orderbook.yes_bid_levels == 0 and orderbook.no_bid_levels == 0)

    if missing_book or thin_top or thin_volume:
        warnings.append(
            Warning(
                kind="liquidity",
                message="Kalshi market has thin or missing orderbook context; treat the implied probability as noisy.",
                severity=BoundedLevel.MEDIUM,
            )
        )
    if prices.spread is not None and prices.spread >= 0.1:
        warnings.append(
            Warning(kind="liquidity", message="Kalshi best bid/ask spread is wide.", severity=BoundedLevel.MEDIUM)
        )
    if prices.yes_bid is not None and prices.yes_ask is not None and prices.yes_bid > prices.yes_ask:
        warnings.append(
            Warning(
                kind="liquidity",
                message="Kalshi best bid is above best ask; quote may be transiently crossed.",
                severity=BoundedLevel.MEDIUM,
            )
        )
    if _status(market.get("status")) != "open" or (close_time is not None and close_time <= now):
        warnings.append(
            Warning(
                kind="staleness",
                message="Kalshi market is not currently open or has already reached close time.",
                severity=BoundedLevel.HIGH,
            )
        )
    return warnings


def _status(raw_status: Any) -> Literal["open", "closed", "settled", "unknown"]:
    status = str(raw_status or "").lower()
    if status in {"active", "open"}:
        return "open"
    if status in {"closed", "inactive"}:
        return "closed"
    if status in {"determined", "settled", "finalized"}:
        return "settled"
    return "unknown"


def _parse_datetime(value: Any) -> datetime | None:
    if not isinstance(value, str) or not value:
        return None
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    return parsed if parsed.tzinfo else parsed.replace(tzinfo=UTC)


def _probability(value: Any) -> float | None:
    decimal_value = _decimal(value)
    if decimal_value is None:
        return None
    if decimal_value > 1:
        decimal_value = decimal_value / Decimal(100)
    return float(decimal_value)


def _fixed_point_count(value: Any) -> Decimal | None:
    return _decimal(value)


def _decimal(value: Any) -> Decimal | None:
    if value is None or value == "":
        return None
    try:
        return Decimal(str(value))
    except InvalidOperation:
        return None

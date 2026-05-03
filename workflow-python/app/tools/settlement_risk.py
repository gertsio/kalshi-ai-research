from datetime import UTC, datetime, timedelta

from app.contracts.workflow import BoundedLevel, SettlementRisk
from app.tools.kalshi_market_data import PublicMarketData

AMBIGUOUS_TITLE_TERMS = (
    "significant",
    "major",
    "substantial",
    "any",
    "first",
    "happen",
    "announce",
    "confirm",
    "reported",
)
CLOSE_TIME_TERMS = ("by ", "before", "after", "during", "through", "as of")
SOURCE_GOTCHA_TERMS = (
    "according to",
    "as reported by",
    "as determined by",
    "official",
    "preliminary",
    "revised",
    "rounded",
    "seasonally adjusted",
    "notwithstanding",
)
MISMATCH_TERMS = (
    "only if",
    "will not include",
    "does not include",
    "excluding",
    "for purposes of",
    "notwithstanding",
    "regardless of",
    "solely",
)


def audit_settlement_risk(market_data: PublicMarketData) -> list[SettlementRisk]:
    risks: list[SettlementRisk] = []
    title = market_data.market.title.lower()
    subtitle = (market_data.market.subtitle or "").lower()
    source = (market_data.market.settlement_source or "").lower()
    contract_text = f"{title} {subtitle} {source}"

    if any(term in title for term in AMBIGUOUS_TITLE_TERMS):
        risks.append(
            SettlementRisk(
                risk="Market title uses wording that may need the full rules to interpret precisely.",
                severity=BoundedLevel.MEDIUM,
            )
        )

    if market_data.market.close_time is None:
        risks.append(
            SettlementRisk(
                risk="Market metadata did not include a close time, so cutoff timing could affect interpretation.",
                severity=BoundedLevel.MEDIUM,
            )
        )
    else:
        close_time = market_data.market.close_time
        normalized_close_time = close_time if close_time.tzinfo else close_time.replace(tzinfo=UTC)
        closes_soon = normalized_close_time <= datetime.now(UTC) + timedelta(days=1)
        if any(term in contract_text for term in CLOSE_TIME_TERMS) or closes_soon:
            risks.append(
                SettlementRisk(
                    risk=(
                        "Close time may differ from the intuitive event window; check the exact cutoff before relying "
                        "on late evidence."
                    ),
                    severity=BoundedLevel.MEDIUM,
                )
            )

    if market_data.market.settlement_source is None:
        risks.append(
            SettlementRisk(
                risk="Market response did not include an explicit settlement source.",
                severity=BoundedLevel.HIGH,
            )
        )
    elif any(term in source for term in SOURCE_GOTCHA_TERMS):
        risks.append(
            SettlementRisk(
                risk="Settlement depends on the named source's exact publication, revision, or determination rules.",
                severity=BoundedLevel.MEDIUM,
            )
        )

    if any(term in source for term in MISMATCH_TERMS):
        risks.append(
            SettlementRisk(
                risk="The intuitive user question may not match the market's narrower contract wording.",
                severity=BoundedLevel.HIGH,
            )
        )

    if risks:
        return risks
    return [
        SettlementRisk(
            risk="No obvious settlement wording, source, or cutoff gotchas detected.", severity=BoundedLevel.LOW
        )
    ]

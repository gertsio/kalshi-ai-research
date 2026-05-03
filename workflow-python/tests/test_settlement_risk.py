from datetime import UTC, datetime, timedelta

from app.contracts.workflow import BoundedLevel, SettlementRisk
from app.tools.kalshi_market_data import MarketMetadata, PriceContext, PublicMarketData
from app.tools.settlement_risk import audit_settlement_risk


def test_audit_flags_ambiguous_wording() -> None:
    risks = audit_settlement_risk(
        _market_data(
            title="Will a major AI lab announce any new model?",
            settlement_source="Company press releases will be used for resolution.",
        )
    )

    assert any("title uses wording" in risk.risk and risk.severity == BoundedLevel.MEDIUM for risk in risks)


def test_audit_flags_close_time_risk() -> None:
    risks = audit_settlement_risk(
        _market_data(
            title="Will the bill pass before Friday?",
            close_time=datetime.now(UTC) + timedelta(hours=12),
            settlement_source="Official congressional record.",
        )
    )

    assert any("Close time" in risk.risk and risk.severity == BoundedLevel.MEDIUM for risk in risks)


def test_audit_flags_resolution_source_risk() -> None:
    risks = audit_settlement_risk(
        _market_data(
            title="Will CPI be above 3%?",
            settlement_source=(
                "Resolved according to the official seasonally adjusted BLS release, including revisions."
            ),
        )
    )

    assert any("named source" in risk.risk and risk.severity == BoundedLevel.MEDIUM for risk in risks)


def test_audit_flags_intuitive_question_mismatch() -> None:
    risks = audit_settlement_risk(
        _market_data(
            title="Will the team win the championship?",
            settlement_source="Resolves yes only if the league names the team champion, excluding vacated titles.",
        )
    )

    assert any("intuitive user question" in risk.risk and risk.severity == BoundedLevel.HIGH for risk in risks)


def test_audit_returns_low_risk_note_when_no_gotchas_detected() -> None:
    risks = audit_settlement_risk(
        _market_data(title="Will Candidate A win the election?", settlement_source="Final certified election result.")
    )

    assert risks == [
        SettlementRisk(
            risk="No obvious settlement wording, source, or cutoff gotchas detected.", severity=BoundedLevel.LOW
        )
    ]


def _market_data(
    *,
    title: str,
    settlement_source: str | None,
    close_time: datetime | None = None,
) -> PublicMarketData:
    if close_time is None:
        close_time = datetime(2100, 12, 31, tzinfo=UTC)
    return PublicMarketData(
        market=MarketMetadata(
            ticker="KXTEST",
            title=title,
            subtitle="",
            url="https://kalshi.com/markets/KXTEST",
            status="open",
            closeTime=close_time,
            settlementSource=settlement_source,
        ),
        implied_probability=0.5,
        prices=PriceContext(yes_bid=0.48, yes_ask=0.52, last_price=0.5, spread=0.04),
        volume=1000,
        open_interest=500,
        warnings=[],
    )

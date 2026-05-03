import pytest

from app.contracts.workflow import BoundedLevel, Evidence, SettlementRisk, Warning
from app.tools.probability_scoring import score_probability


def _evidence(relevance: BoundedLevel = BoundedLevel.HIGH) -> Evidence:
    return Evidence(
        claim="Relevant public evidence supports the event resolving yes.",
        source_title="Official Source",
        source_url="https://example.test/source",
        relevance=relevance,
    )


def test_probability_estimate_is_clamped_to_valid_range() -> None:
    result = score_probability(
        kalshi_implied_probability=0.99,
        evidence=[_evidence(), _evidence(), _evidence()],
        settlement_risks=[],
        counterarguments=[],
    )

    assert result.probability == 1


def test_delta_is_agent_estimate_minus_kalshi_implied_probability() -> None:
    result = score_probability(
        kalshi_implied_probability=0.6,
        evidence=[],
        settlement_risks=[],
        counterarguments=["The market may already include the available signal."],
    )

    assert result.delta.probability_points == pytest.approx(result.probability - 0.6)
    assert result.delta.direction == "agent_lower"


def test_confidence_drops_when_evidence_is_low() -> None:
    result = score_probability(
        kalshi_implied_probability=0.4,
        evidence=[_evidence(BoundedLevel.HIGH)],
        settlement_risks=[],
    )

    assert result.confidence == BoundedLevel.LOW


def test_confidence_drops_when_ambiguity_is_high() -> None:
    result = score_probability(
        kalshi_implied_probability=0.4,
        evidence=[_evidence(), _evidence(), _evidence()],
        settlement_risks=[SettlementRisk(risk="Settlement wording is ambiguous.", severity=BoundedLevel.HIGH)],
    )

    assert result.confidence == BoundedLevel.LOW


def test_settlement_risk_pulls_estimate_toward_uncertainty() -> None:
    without_risk = score_probability(
        kalshi_implied_probability=0.2,
        evidence=[_evidence(), _evidence()],
        settlement_risks=[],
        counterarguments=[],
    )
    with_risk = score_probability(
        kalshi_implied_probability=0.2,
        evidence=[_evidence(), _evidence()],
        settlement_risks=[SettlementRisk(risk="Settlement mapping is unclear.", severity=BoundedLevel.HIGH)],
        counterarguments=[],
    )

    assert without_risk.probability < with_risk.probability < 0.5


def test_output_includes_skeptic_and_what_would_change_bullets() -> None:
    result = score_probability(kalshi_implied_probability=0.4, evidence=[_evidence(), _evidence()], settlement_risks=[])

    assert result.counterarguments
    assert result.what_would_change


def test_output_rejects_trade_instruction_language() -> None:
    with pytest.raises(ValueError, match="trade instruction"):
        score_probability(
            kalshi_implied_probability=0.4,
            evidence=[_evidence(), _evidence()],
            settlement_risks=[],
            counterarguments=["Buy this because the evidence is strong."],
        )


def test_high_severity_warning_reduces_confidence() -> None:
    result = score_probability(
        kalshi_implied_probability=0.4,
        evidence=[_evidence(), _evidence(), _evidence()],
        settlement_risks=[],
        warnings=[Warning(kind="staleness", message="Market data is stale.", severity=BoundedLevel.HIGH)],
    )

    assert result.confidence == BoundedLevel.LOW

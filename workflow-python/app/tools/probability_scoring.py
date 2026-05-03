from app.contracts.workflow import AgentEstimate, BoundedLevel, Delta, Evidence, NonEmptyString, SettlementRisk, Warning

LEVEL_SCORE = {BoundedLevel.LOW: 1, BoundedLevel.MEDIUM: 2, BoundedLevel.HIGH: 3}
EVIDENCE_ADJUSTMENT = {BoundedLevel.LOW: 0.01, BoundedLevel.MEDIUM: 0.04, BoundedLevel.HIGH: 0.08}
SETTLEMENT_PULL_TO_UNCERTAINTY = {BoundedLevel.LOW: 0.05, BoundedLevel.MEDIUM: 0.15, BoundedLevel.HIGH: 0.3}
LOW_EVIDENCE_THRESHOLD = 2
TRADE_INSTRUCTION_PHRASES = (
    "buy ",
    "sell ",
    "place a trade",
    "place any trade",
    "trade this",
    "take this position",
)


class ProbabilityScoringResult(AgentEstimate):
    delta: Delta
    counterarguments: list[NonEmptyString]
    settlement_risks: list[SettlementRisk]
    what_would_change: list[NonEmptyString]


def score_probability(
    *,
    kalshi_implied_probability: float,
    evidence: list[Evidence],
    settlement_risks: list[SettlementRisk],
    counterarguments: list[str] | None = None,
    warnings: list[Warning] | None = None,
) -> ProbabilityScoringResult:
    """Convert research inputs into a bounded estimate without producing trading advice."""
    warning_list = warnings or []
    objections = _safe_bullets(
        counterarguments
        or [
            "The market price may already reflect the public evidence.",
            "The evidence may not map cleanly to the market's settlement criteria.",
        ]
    )
    settlement_risk_list = settlement_risks or [
        SettlementRisk(risk="No explicit settlement-risk review was provided.", severity=BoundedLevel.MEDIUM)
    ]

    evidence_push = min(sum(EVIDENCE_ADJUSTMENT[item.relevance] for item in evidence), 0.18)
    skepticism_drag = min(len(objections) * 0.03, 0.09)
    raw_probability = kalshi_implied_probability + evidence_push - skepticism_drag

    for risk in settlement_risk_list:
        pull = SETTLEMENT_PULL_TO_UNCERTAINTY[risk.severity]
        raw_probability = raw_probability + (0.5 - raw_probability) * pull

    probability = _clamp(raw_probability)
    probability_points = probability - kalshi_implied_probability

    return ProbabilityScoringResult(
        probability=probability,
        confidence=_confidence(evidence, settlement_risk_list, warning_list),
        thesis=_safe_text(_thesis(probability, kalshi_implied_probability, evidence, settlement_risk_list)),
        assumptions=_safe_bullets(
            [
                "Public evidence remains relevant to the market's exact resolution criteria.",
                "The Kalshi implied probability is a useful but noisy market baseline.",
            ]
        ),
        delta=Delta(probability_points=probability_points, direction=_direction(probability_points)),
        counterarguments=objections,
        settlement_risks=settlement_risk_list,
        what_would_change=_safe_bullets(
            [
                "New high-relevance evidence contradicting the current signal would move the estimate.",
                "A settlement clarification or data-quality issue would reduce confidence.",
                "Materially stale or thin market data would make the Kalshi baseline less reliable.",
            ]
        ),
    )


def _confidence(
    evidence: list[Evidence], settlement_risks: list[SettlementRisk], warnings: list[Warning]
) -> BoundedLevel:
    high_relevance_count = sum(1 for item in evidence if item.relevance == BoundedLevel.HIGH)
    medium_or_better_count = sum(
        1 for item in evidence if LEVEL_SCORE[item.relevance] >= LEVEL_SCORE[BoundedLevel.MEDIUM]
    )
    high_ambiguity = any(risk.severity == BoundedLevel.HIGH for risk in settlement_risks) or any(
        warning.severity == BoundedLevel.HIGH for warning in warnings
    )

    if len(evidence) < LOW_EVIDENCE_THRESHOLD or high_ambiguity:
        return BoundedLevel.LOW
    if medium_or_better_count >= 3 and high_relevance_count >= 2 and not settlement_risks:
        return BoundedLevel.HIGH
    return BoundedLevel.MEDIUM


def _thesis(
    probability: float,
    kalshi_implied_probability: float,
    evidence: list[Evidence],
    settlement_risks: list[SettlementRisk],
) -> str:
    if probability > kalshi_implied_probability:
        relation = "above"
    elif probability < kalshi_implied_probability:
        relation = "below"
    else:
        relation = "in line with"
    return (
        f"The bounded research estimate is {probability:.0%}, {relation} Kalshi's implied probability, "
        f"based on {len(evidence)} evidence item(s) and {len(settlement_risks)} settlement-risk concern(s)."
    )


def _direction(probability_points: float) -> str:
    if abs(probability_points) <= 0.000001:
        return "in_line"
    return "agent_higher" if probability_points > 0 else "agent_lower"


def _clamp(value: float) -> float:
    return min(max(value, 0), 1)


def _safe_bullets(values: list[str]) -> list[str]:
    return [_safe_text(value) for value in values]


def _safe_text(value: str) -> str:
    lowered = f" {value.lower()} "
    if any(phrase in lowered for phrase in TRADE_INSTRUCTION_PHRASES):
        raise ValueError("Probability scoring output must not include trade instruction language.")
    return value

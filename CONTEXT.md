# Probable

Probable is an event-probability predictor and explainer: a user submits an event, a live research pass estimates how likely it is, and the interface animates the analysis while it runs.

## Language

**Analysis Engine**:
The Python pipeline that researches one event and emits Analysis Events while it works.
_Avoid_: workflow service, orchestrator

**Event Source**:
The seam that resolves user input into researchable market data. Kalshi is the first implementation.
_Avoid_: market tool, data provider (ambiguous with research tools)

**Analysis Event**:
One typed progress item streamed over SSE (stage transition, source found, evidence added, settlement risk, warning, estimate update, final, error).
_Avoid_: message, update

**Workflow Response Contract**:
The validated final artifact for one analyzed event — market snapshot, estimate, delta, evidence, counterarguments, settlement risks, memo, disclaimer. Rendered only after schema validation on both sides.
_Avoid_: research record, trading signal

**Research Memo**:
The user-facing finished sheet rendered from the Workflow Response Contract.

## Relationships

- The **Analysis Engine** yields **Analysis Events**; the last successful event carries the **Workflow Response Contract**.
- The blocking `/analyze` endpoint and the `/analyze/stream` SSE endpoint share one engine code path.
- Demo mode replays the fixture response through the same **Analysis Event** shapes with pacing.

## Boundaries

- Research assistance only: no trades, no orders, no advice framing; the contract validates the disclaimer and forbids recommendation phrasing.
- Provider secrets (Gemini, Tavily) exist only in the engine; the browser never holds them.

## Flagged Ambiguities

- "Contract" means the **Workflow Response Contract** (a UI render contract), not a Kalshi market contract.

# Kalshi Research Swarm

Kalshi Research Swarm is a research-only prediction-market analysis context for comparing Kalshi market probabilities with agent-generated estimates.

## Language

**Workflow Response Contract**:
A UI render contract returned by the external agent workflow after analyzing one Kalshi market.
_Avoid_: Research record, agent transcript, trading signal

## Relationships

- A **Workflow Response Contract** describes exactly one Kalshi market analysis.
- A **Workflow Response Contract** is rendered by the frontend only after schema validation succeeds.

## Example Dialogue

> **Dev:** "Should this response be a reusable research artifact or the thing the UI renders?"
> **Domain expert:** "For the MVP, make it the **Workflow Response Contract** so the demo fixture can drive the frontend before live agents are connected."

## Flagged Ambiguities

- "Contract" was resolved to mean **Workflow Response Contract**, a UI render contract, not a legal Kalshi market contract.

# Ticket 002 — Streaming event-probability engine

## Question

Refactor `workflow-python/` from a single blocking `/analyze` call into an
event-probability engine that streams typed progress events while it works.

## Acceptance

- An `EventSource` seam resolves user input into a researchable event; Kalshi
  is the first implementation. The engine loop does not import Kalshi
  specifics.
- A streaming endpoint (SSE) emits typed events: stage started/completed,
  source found (with URL and title), evidence added, estimate updated, final
  response, error. The final event carries the same validated response
  contract the blocking endpoint returns.
- The blocking `/analyze` endpoint remains for tests and simple clients.
- Contract validation (research-only language, disclaimer, delta consistency)
  stays enforced; demo mode still works without provider keys and streams the
  same event shapes with realistic pacing.
- `scripts/check` inside `workflow-python/` is the single gate (lock check,
  ruff format+lint, mypy, pytest) and CI runs it.

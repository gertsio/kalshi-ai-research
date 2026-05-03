# Architecture

Kalshi Research Swarm keeps frontend rendering, shared workflow contracts, and the external AG2 workflow in separate runtime seams.

## Runtime Seams

- `app/`: Next.js App Router entrypoints and route-level composition.
- `components/`: shallow presentational UI modules.
- `features/research-memo/`: frontend behavior for submitting a market input, validating a Workflow Response Contract, and mapping it into UI state.
- `contracts/workflow/`: TypeScript Workflow Response Contract schema, parser, and contract-validating fixtures.
- `workflow-python/`: Python AG2 workflow runtime for secret-bearing market data, search, model calls, and six-agent orchestration.
- `tests/`: tests organized by the public module seam they exercise.

## Dependency Direction

- Frontend code may import from `contracts/workflow/`.
- Frontend code must not import from `workflow-python/`.
- `workflow-python/` treats the TypeScript contract as the canonical UI render contract for MVP shape, but validates its own Python output before returning JSON.
- Secret-bearing providers live only behind `workflow-python/` adapters or hosted AG2 configuration.

## Deep Modules

- `contracts/workflow/`: validates the Workflow Response Contract before rendering.
- `contracts/workflow/fixtures/`: owns deterministic fixtures that must validate against the Workflow Response Contract before they are used by demos or UI tests.
- `workflow-python/app/orchestrator/`: coordinates the six AG2 agents.
- `workflow-python/app/tools/`: isolates Kalshi and Tavily adapters.
- `workflow-python/app/scoring/`: owns probability, confidence, and delta rules.
- `workflow-python/app/settlement/`: owns settlement-risk audit behavior.
- `workflow-python/app/evidence/`: owns evidence normalization and citation handling.

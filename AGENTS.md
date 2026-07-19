# Predictor Agent Brief

This repo is an event-probability predictor and explainer. A Python FastAPI engine researches one event at a time — market data, settlement rules, public evidence, probability estimation, skeptic calibration — and streams incremental findings to a React frontend that animates the analysis as it happens. Kalshi prediction markets are the first event source; the engine seam is source-agnostic so arbitrary events can plug in later. Research assistance only: no trades, no orders, no financial advice.

## Read Path

Read only the sources the task needs:

- Domain vocabulary and boundaries: `CONTEXT.md`.
- Setup, commands, and architecture: `README.md`.
- Current work state: `docs/work/` (start at `index.json`).

## Change Discipline

- **Follow ownership.** Code and tests own behavior; `CONTEXT.md` owns domain
  vocabulary; `README.md` owns operator commands; manifests under `docs/work/`
  own work state. Git owns history.
- **Rewrite, do not append.** Update the owner, remove superseded guidance,
  and use pointers for history.
- **Keep scope narrow.** Build the current primary path; add sources,
  abstraction, and edge cases only from observed need.

## Boundaries

- Secret-bearing providers (LLM, web search) are called only from
  `workflow-python/`. The browser never holds or sends provider keys.
- Every user-facing analysis stays research-only: no trade recommendations,
  and the response contract enforces the disclaimer and forbidden phrasing.
- The frontend renders only contract-validated responses.

## Review And Checks

All changes ship via pull request; never push directly to `main`. Work on a
topic branch, run the checks for the surfaces you touched (`npm run check` for
the frontend, `scripts/check` inside `workflow-python/` for the engine), open
a PR, and wait for CI before merge.

## Friction Log

When a task hits missing context, stale guidance, a repeated rediscovery, or
tooling friction, append one line to `docs/agents/friction-log.md` (format
inside) before finishing. Do not fix logged issues inline unless trivial;
the `groom-friction` skill converts the log into fixes and tickets.

<!-- agent-skills-hub:start -->

## Agent skills

### Issue tracker

Specs and tickets are local-first under `docs/work/`. See `docs/agents/issue-tracker.md`.
When upstream skills mention generic local files such as root `tickets.md`, use the tracker contract in `docs/agents/issue-tracker.md` instead of creating a parallel tracker.

### Triage labels

Use the default five-label triage vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repo using root `CONTEXT.md` and root `docs/adr/` for architectural decisions. See `docs/agents/domain.md`.

<!-- agent-skills-hub:end -->

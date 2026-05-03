# PRD: Wire AG2 Into Kalshi Research Workflow

## Problem Statement

Kalshi AI Research currently presents a six-agent trace, but the live implementation is a sequential Python workflow: Kalshi market data, deterministic settlement audit, Tavily evidence search, Gemini probability scoring, response assembly, and strict contract validation. This produces useful live research output, but it does not yet prove real AG2 multi-agent orchestration.

The current weakness is not live data. Live Kalshi, Tavily, and Gemini pieces already work. The weakness is that specialist roles like Skeptic Agent and Memo Editor Agent are trace-only rather than actual AG2 agents, and the probability estimate can become overconfident when evidence is thin, contradictory, or over-weighted.

## Solution

Add an AG2-backed orchestration seam inside the Python workflow runtime. The first implementation should keep the existing HTTP API and Workflow Response Contract stable, but replace the trace-only agent flow with real AG2 beta agents where they materially improve quality.

The AG2 implementation should use guidance from the AG2 build-with-ag2 skills repository:

https://github.com/ag2ai/build-with-ag2/tree/main/.agents/skills

Priority skills for implementation agents to fetch and follow:

- `ag2-quickstart`: build minimal beta `Agent` objects, choose provider config, and use async `agent.ask()` / `reply.ask()` correctly.
- `ag2-add-custom-tool`: expose existing Kalshi, evidence, settlement, and scoring capabilities as typed custom Python tools where needed.
- `ag2-structured-output`: return typed Pydantic values instead of parsing free-form text, with validation retries.
- `ag2-subagent-delegation`: use a coordinator plus named specialist agents, or agent-as-tool delegation, rather than one generic LLM prompt.
- `ag2-testing`: test AG2 agents and tools without real LLM calls by using mocked model responses and tool events.
- Optional follow-ups: `ag2-telemetry`, `ag2-observers-and-alerts`, and `ag2-hitl` if the product later needs richer progress events, monitoring, or human approval gates.

The recommended first vertical slice is a real AG2 Skeptic/Calibrator Agent after the existing Gemini probability draft. This keeps blast radius small while demonstrating genuine AG2 value. The Skeptic should review evidence quality, confidence calibration, one-sided reasoning, settlement risks, and market/liquidity warnings, then return structured critique. The final estimate should be revised only through a typed structured output path and must still validate against the Workflow Response Contract.

## User Stories

1. As a hackathon judge, I want the project to use real AG2 agents, so that the six-agent trace reflects actual orchestration rather than labels.
2. As a prediction-market researcher, I want a Skeptic Agent to challenge the initial estimate, so that the memo does not over-weight one compelling source.
3. As a prediction-market researcher, I want confidence to be calibrated against evidence quality, so that `high` confidence is not shown when the evidence base is weak.
4. As a prediction-market researcher, I want the agents to identify contradictory evidence, so that I can see uncertainty instead of a one-sided thesis.
5. As a prediction-market researcher, I want the final estimate to explain whether it changed after critique, so that I can trust the reasoning process.
6. As a frontend user, I want the same result UI to keep working, so that AG2 wiring does not require a redesign.
7. As a frontend user, I want agent trace entries to represent actual agent stages, so that progress and final output are honest.
8. As a workflow maintainer, I want the HTTP API contract to stay stable, so that the frontend does not break while AG2 is introduced.
9. As a workflow maintainer, I want AG2 provider configuration to reuse existing secret-bearing backend settings, so that no model keys leak to the browser.
10. As a workflow maintainer, I want existing Kalshi, Tavily, settlement, and scoring modules reused as tools, so that AG2 wiring does not duplicate business logic.
11. As a workflow maintainer, I want AG2 structured output mapped into the existing Pydantic contract, so that malformed model output fails loudly.
12. As a workflow maintainer, I want AG2 tests that do not call real model providers, so that CI stays deterministic and cheap.
13. As a workflow maintainer, I want a feature flag or configuration seam for AG2 mode, so that the deterministic live pipeline remains available if AG2 fails.
14. As a workflow maintainer, I want typed error mapping for AG2 failures, so that users see clear `model_failure` or `malformed_response` states.
15. As a product owner, I want the app to remain research-only, so that AG2 agents never produce trade instructions.
16. As a product owner, I want the final memo to preserve disclaimers, so that the output is not mistaken for financial advice.
17. As a future maintainer, I want AG2 to be introduced in a small vertical slice first, so that the team can compare quality before committing to a full swarm.
18. As a future maintainer, I want a path from one AG2 skeptic slice to a full coordinator/specialist workflow, so that implementation can grow incrementally.

## Implementation Decisions

- Do not change the browser-facing Workflow Request Contract or Workflow Response Contract in the first AG2 PR unless a clear contract gap is discovered.
- Keep the existing FastAPI `/analyze` endpoint as the integration boundary.
- Add an AG2 orchestration module behind the current workflow service seam rather than putting AG2 logic in HTTP route handlers.
- Reuse existing deep modules for Kalshi market data, evidence normalization, settlement risk, probability scoring, secret redaction, and response validation.
- Start with a minimal AG2 vertical slice: initial probability draft, AG2 Skeptic/Calibrator structured critique, revised final scoring payload, strict response validation.
- Use AG2 beta `Agent` APIs from the `ag2-quickstart` skill as the base pattern.
- Use AG2 custom tools only where the agent needs to call existing Python capabilities itself. Do not wrap everything as an agent tool if deterministic service calls are simpler.
- Use AG2 structured output for any model-authored critique or revised estimate. Do not parse free-form prose into production objects.
- Prefer a coordinator-plus-specialist shape once more than one real AG2 specialist is introduced.
- Keep the deterministic non-AG2 live pipeline as a fallback until the AG2 path is proven reliable.
- Use existing backend settings for model provider configuration. Gemini/OpenRouter support should remain secret-bearing and backend-only.
- Ensure AG2 output passes the same safety checks against direct buy/sell/place-trade language.
- Represent actual AG2 stages in `agentTrace`; do not claim a role completed if that role did not run.
- Do not push a branch or open a PR as part of this PRD step. Implementation should happen on a local topic branch first, then be pushed and opened as a PR only when explicitly requested.

## Testing Decisions

Good tests should verify externally visible workflow behavior and contract invariants, not exact LLM wording. Tests should avoid real Kalshi, Tavily, Gemini, OpenRouter, or AG2 provider calls in CI.

Modules to test:

- AG2 orchestration seam: verifies the AG2 path runs with mocked model output and returns a valid Workflow Response Contract.
- Skeptic/Calibrator structured output: verifies critique lowers confidence or flags weak evidence when evidence quality is insufficient.
- Response mapping: verifies AG2 structured output maps into the existing response shape and preserves delta invariants.
- Fallback behavior: verifies non-AG2 live pipeline remains usable when AG2 mode is disabled or unavailable.
- Safety behavior: verifies AG2-authored thesis, counterarguments, what-would-change, and memo text cannot contain direct trade recommendation phrasing.
- Error behavior: verifies malformed AG2 structured output maps to the existing malformed/model error boundary.

Prior art already exists in the repo for workflow orchestration tests, contract tests, market-data tests, evidence-research tests, settlement-risk tests, probability-scoring tests, and API route tests. AG2-specific tests should follow those public-seam patterns and use AG2 `TestConfig` or mocked adapters instead of real providers.

## Out of Scope

- No Kalshi trading, orders, portfolios, brokerage auth, or position management.
- No frontend redesign required for the first AG2 PR.
- No streaming progress UI required in the first AG2 PR.
- No full six-agent AG2 swarm required in the first PR if the Skeptic/Calibrator slice proves AG2 integration clearly.
- No pushing branches or opening pull requests from this planning step.
- No storing or exposing model/search/Kalshi secrets in browser-facing configuration.
- No exact LLM prose snapshots in tests.

## Further Notes

The implementation agents working this PR should fetch and follow the AG2 skill docs from `ag2ai/build-with-ag2/.agents/skills` before coding. The most important design constraint is to preserve the existing typed Workflow Response Contract while making at least one agent role genuinely AG2-backed. The best first demonstration is a real skeptic/calibrator pass because it directly addresses observed output quality issues, especially overconfidence from thin or noisy evidence.

GitHub issue: https://github.com/gertsio/kalshi-ai-research/issues/30

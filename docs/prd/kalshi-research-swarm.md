# PRD: Kalshi Research Swarm

## Problem Statement

Prediction market research is valuable, but fast-moving markets are hard to evaluate during a hackathon because the operator must manually combine market prices, orderbook context, settlement rules, current web evidence, counterarguments, and a probability estimate. A single chatbot can produce a plausible memo, but it often hides the reasoning path, misses settlement gotchas, fails to separate evidence from opinion, and does not give a typed result that a polished UI can render safely.

The user wants to build a one-day hackathon prototype around Kalshi prediction-market research agents. The prototype should demonstrate meaningful multi-agent collaboration, use AG2 as the agent framework, use sponsor credits and tools from the hackathon, and still hold a high bar for code quality: type-safe contracts, validation, linting, tests, and a demo-safe product posture.

The product must not become a trading bot. It should not execute trades, recommend “buy” or “sell,” or require user brokerage credentials. The goal is research assistance: compare Kalshi’s market-implied probability with an agent-generated research estimate, explain the evidence, expose risks, and help a builder or researcher understand why the market might be over- or under-estimating an outcome.

## Solution

Build **Kalshi Research Swarm**, a client-side Next.js React app that accepts a Kalshi market URL or ticker and calls an external AG2-powered workflow. The AG2 workflow uses a fixed six-agent team to produce a strict typed JSON research result. The frontend validates that result, renders a polished memo, and shows the separate agent contributions.

The core demo promise:

> Given a Kalshi market ticker or URL, the app produces a research memo that compares Kalshi’s current implied probability against an agent-generated probability estimate, explains the evidence, lists settlement and liquidity risks, and shows what would change the estimate.

The prototype experience:

1. User opens the web app.
2. User pastes a Kalshi market URL or ticker, or picks a demo-safe example.
3. The React app calls an external AG2 workflow endpoint.
4. The AG2 workflow parses the market input, pulls Kalshi public market data, researches the market using Tavily and Gemini, runs a fixed multi-agent critique workflow, and returns strict JSON.
5. The React app validates the response, renders:
   - Market title and ticker.
   - Kalshi implied probability.
   - Agent-estimated probability.
   - Delta between market and agent estimate.
   - Confidence level.
   - One-sentence thesis.
   - Evidence cards.
   - Counterarguments.
   - Settlement-risk notes.
   - Liquidity/staleness warnings.
   - Agent trace.
   - Final markdown memo.
   - Research-only disclaimer.

This is explicitly **research-only**. The app can say the agent estimate is above or below the market-implied probability. It must not say “buy YES,” “sell NO,” “place this trade,” or execute any order.

## User Stories

1. As a hackathon judge, I want to paste a Kalshi market URL and immediately see a research memo, so that I can understand the product without setup friction.
2. As a hackathon participant, I want the demo to work from a ticker as well as a URL, so that I am not blocked if a copied URL has tracking parameters or a nonstandard format.
3. As a hackathon participant, I want a “try example” picker, so that the live demo remains reliable even if a selected market has thin data or an external API is slow.
4. As a prediction-market researcher, I want to see Kalshi’s implied probability next to the agent’s estimate, so that I can quickly identify the research signal.
5. As a prediction-market researcher, I want the delta between market price and agent estimate, so that I can see whether the agents think the market is over- or under-estimating the event.
6. As a prediction-market researcher, I want confidence shown separately from probability, so that I do not confuse a precise-looking number with certainty.
7. As a prediction-market researcher, I want the agents to explain the assumptions behind the probability estimate, so that I can judge whether the estimate is credible.
8. As a prediction-market researcher, I want evidence cards with source titles and relevance levels, so that I can trace the memo back to supporting facts.
9. As a prediction-market researcher, I want counterarguments, so that I can see why the estimate might be wrong.
10. As a prediction-market researcher, I want settlement-risk notes, so that I do not misunderstand the exact resolution criteria.
11. As a prediction-market researcher, I want liquidity and staleness warnings, so that I do not overread a market with a stale price or wide spread.
12. As a prediction-market researcher, I want a “what would change our mind” section, so that I know which future data points matter most.
13. As a prediction-market researcher, I want a concise one-sentence thesis, so that I can scan the result quickly before reading the full memo.
14. As a prediction-market researcher, I want a full memo in markdown, so that I can copy it into notes or a team chat.
15. As a prediction-market researcher, I want the memo to avoid investment-advice language, so that the product remains research-focused.
16. As a software builder, I want to see the named agents and their roles, so that the demo clearly proves this is not just one generic LLM response.
17. As a software builder, I want an agent trace summary, so that I can explain the workflow during the final presentation.
18. As a software builder, I want each agent to have a clear responsibility, so that multi-agent collaboration is legible to judges.
19. As a software builder, I want a Market Data Agent, so that Kalshi data collection is isolated from the rest of the workflow.
20. As a software builder, I want a Settlement Rules Agent, so that contract ambiguity is treated as a first-class research problem.
21. As a software builder, I want a Research Agent, so that web evidence gathering has a dedicated owner.
22. As a software builder, I want a Probability Estimator Agent, so that probability estimation is explicit and reviewable.
23. As a software builder, I want a Skeptic Agent, so that the workflow actively challenges its own conclusion.
24. As a software builder, I want a Memo Editor Agent, so that the final output is coherent and typed.
25. As a frontend user, I want loading states while agents are working, so that the app does not feel frozen.
26. As a frontend user, I want clear error states if the AG2 workflow fails, so that I know whether to retry or use the demo fixture.
27. As a frontend user, I want partial agent-stage progress if available, so that the demo feels alive during long research runs.
28. As a frontend user, I want the final result rendered as UI cards rather than a raw JSON blob, so that the output is judge-friendly.
29. As a frontend user, I want the raw JSON available behind a developer toggle, so that technical judges can inspect the contract.
30. As a frontend user, I want the disclaimer always visible, so that research output is not mistaken for trading advice.
31. As a frontend user, I want the app to work as a mostly static Next.js app, so that deployment is simple and fast.
32. As a frontend user, I want no secrets stored in the browser, so that Tavily, Gemini, and AG2 credentials cannot leak through frontend code.
33. As an AG2 workflow maintainer, I want the AG2 service to return strict JSON, so that the frontend does not parse free-form LLM output.
34. As an AG2 workflow maintainer, I want schema validation at the workflow boundary, so that malformed agent output fails loudly.
35. As an AG2 workflow maintainer, I want typed request and response contracts shared conceptually across frontend and workflow, so that integration bugs are caught early.
36. As an AG2 workflow maintainer, I want a deterministic demo fixture, so that the product can still be presented if live APIs fail.
37. As an AG2 workflow maintainer, I want Tavily search isolated behind a search tool, so that the agent workflow can be tested with mocked results.
38. As an AG2 workflow maintainer, I want Kalshi market-data access isolated behind a market-data tool, so that it can be tested independently of the agents.
39. As an AG2 workflow maintainer, I want probability-estimation logic isolated behind a scoring module, so that invariants like probability bounds and delta signs can be tested.
40. As an AG2 workflow maintainer, I want the settlement-risk audit isolated behind its own module, so that it can improve without changing the UI contract.
41. As a teammate, I want the app to use the hackathon AG2 credits, so that the demo is centered on the sponsoring framework.
42. As a teammate, I want the app to use Tavily credits for web search, so that evidence gathering is fast and relevant.
43. As a teammate, I want the app to use Google Gemini credits as the primary reasoning model, so that sponsor-provided LLM capacity is used.
44. As a teammate, I want the app to use v0/Vercel credits for UI generation and deployment, so that the frontend can be polished quickly.
45. As a teammate, I want Daytona credits available for isolated code execution or fallback service runtime, so that agent-generated code or workflow experimentation is safe.
46. As a teammate, I want a simple deployment story, so that hackathon time goes into product polish rather than infrastructure debugging.
47. As a teammate, I want linting and type checking wired from the beginning, so that code quality does not collapse under deadline pressure.
48. As a teammate, I want formatting enforced, so that the team does not waste time debating style.
49. As a teammate, I want tests for the deep modules, so that refactors during the hackathon do not break the demo.
50. As a teammate, I want no direct Kalshi trading auth in the MVP, so that the product avoids unnecessary compliance and security complexity.
51. As a teammate, I want the app to support a final presentation narrative, so that we can explain the problem, agent architecture, and demo in under two minutes.
52. As a judge, I want to see why multiple agents are necessary, so that the project fits the “multi-agent collaboration” prize.
53. As a judge, I want to see scientific/research applicability, so that the project can compete for the research-focused prize category.
54. As a judge, I want to see a working prototype rather than slides, so that the build feels real.
55. As a future maintainer, I want the product scope clearly bounded, so that stretch goals do not distract from the MVP.
56. As a future maintainer, I want natural-language market discovery marked as stretch, so that the MVP stays focused on analyzing one known market.
57. As a future maintainer, I want live WebSocket market monitoring marked as stretch, so that real-time streaming does not derail the core demo.
58. As a future maintainer, I want the typed output schema to survive UI redesigns, so that the rendering layer can change without rewriting the workflow.
59. As a future maintainer, I want sponsor integrations documented, so that the team can explain why each tool was used.
60. As a future maintainer, I want the project to leave room for production hardening later, so that the hackathon prototype can evolve without pretending it is production-ready.

## Implementation Decisions

- The project name is **Kalshi Research Swarm**.
- The product is a research assistant only. It will not execute trades, place orders, manage portfolios, or produce direct buy/sell instructions.
- The MVP accepts a Kalshi market URL or ticker.
- Natural-language market discovery is a stretch goal.
- The frontend is a Next.js app using the App Router, but the product is effectively client-side React.
- The frontend must not use Next.js API routes for secret-bearing operations.
- The browser calls an external AG2 workflow endpoint.
- AG2 orchestration lives outside the browser, either on the AG2 platform/hosted workflow or an external Python service if needed.
- The browser must never directly call Gemini, Tavily, or any other secret-bearing provider.
- The only browser-exposed configuration should be non-secret values such as the public AG2 workflow endpoint and demo-mode flags.
- The frontend deploy target is Vercel.
- v0/Vercel credits should be used to accelerate UI generation and frontend deployment.
- AG2 platform credits should be used for agent orchestration and LLM/tooling costs where supported.
- Tavily credits should be used by the Research Agent for web search.
- Google Gemini credits should be used as the primary reasoning/model provider for the AG2 workflow unless the hackathon environment makes another model materially easier.
- Daytona credits should be used for isolated code execution, workflow experimentation, or fallback runtime if the AG2 hosted workflow path is blocked.
- Kalshi access for the MVP is public market data only.
- Authenticated Kalshi trading endpoints are out of scope.
- The AG2 workflow should return strict structured JSON.
- The frontend should validate workflow responses before rendering.
- The final research memo may be markdown, but it should be one field inside the typed JSON payload rather than the only output.
- The typed result should include: market metadata, Kalshi probability data, agent estimate, evidence, counterarguments, settlement risks, what-would-change-our-mind bullets, agent trace, final memo markdown, and disclaimer.
- The confidence enum is limited to low, medium, or high.
- Evidence relevance is limited to low, medium, or high.
- Risk severity is limited to low, medium, or high.
- Probability fields should be numeric and clamped to a valid probability range.
- Delta should be derived consistently from agent estimate minus Kalshi implied probability.
- The UI should show the research signal as a difference in probability, not as a trade instruction.
- The fixed MVP agent workflow has six agents:
  - Market Data Agent.
  - Settlement Rules Agent.
  - Research Agent.
  - Probability Estimator Agent.
  - Skeptic Agent.
  - Memo Editor Agent.
- The Market Data Agent parses the Kalshi input, fetches market data, computes price/spread/liquidity fields, and produces a market snapshot.
- The Settlement Rules Agent inspects title, subtitle, rules, resolution criteria, close time, settlement source, and edge cases.
- The Research Agent uses search and model reasoning to gather relevant, recent, reputable evidence.
- The Probability Estimator Agent converts evidence and assumptions into a probability estimate and confidence level.
- The Skeptic Agent challenges the estimate, flags missing data, identifies weak assumptions, and highlights liquidity/staleness concerns.
- The Memo Editor Agent merges the agent outputs into the strict typed response contract.
- The AG2 implementation should use the AG2 build-with-ag2 skills repository as a playbook during implementation.
- Priority AG2 implementation guidance should include quickstart, custom tools, structured output, subagent delegation, testing, telemetry, observers/alerts, and human-in-the-loop only if approval gates are added.
- AG2 workflow telemetry should be surfaced as a simple agent trace in the UI.
- Streaming progress is a nice-to-have, not required for MVP.
- The app should include a demo-safe fixture result.
- The app should include an example picker with one or more known-good markets or mocked market examples.
- The product must display a disclaimer in the final result.
- The product must avoid language that implies personalized financial advice.
- The product should describe its output as research signal, estimate, or memo, not as a trading recommendation.
- Code quality gates must be part of the initial scaffold, not added at the end.
- Frontend quality gates: TypeScript strict mode, linting, formatting, schema validation, and tests for deep modules.
- Frontend package management should be deterministic with a lockfile.
- Frontend should use a schema validator for response validation.
- Frontend should keep rendering components shallow and extract data transformation into testable modules.
- Python/AG2 quality gates: linting, formatting, type checking where practical, tests, and mocked external API fixtures.
- The deepest modules should be:
  - Market input normalization.
  - Typed request/response contract validation.
  - Kalshi market-data tool.
  - Settlement-risk audit.
  - Probability scoring and confidence logic.
  - Evidence normalization and citation handling.
  - AG2 workflow orchestrator.
  - Demo fixture provider.
  - UI result-view model mapper.
- The shallow modules should be mostly presentational UI cards and layout wrappers.
- CORS must be restricted to the deployed frontend origin during demo deployment.
- Errors should be explicit: invalid market input, external workflow unavailable, malformed workflow response, market data unavailable, search/model failure, and demo fixture fallback available.
- The UI should not render unvalidated arbitrary HTML from the workflow.
- Markdown rendering should be sanitized or limited to safe markdown.
- The final presentation should emphasize why the task benefits from multiple agents: market data, rules, evidence, estimation, skepticism, and writing are distinct responsibilities.

## Testing Decisions

A good test for this project should verify externally visible behavior and contract invariants, not internal implementation details. Tests should not assert exact LLM wording. They should assert shape, safety, bounds, required sections, and user-visible outcomes.

Modules that should receive tests:

- **Market input normalization**
  - Accepts Kalshi ticker.
  - Accepts Kalshi market URL.
  - Removes irrelevant URL tracking parameters.
  - Rejects empty or obviously invalid input.
  - Produces a normalized market identifier.

- **Typed request/response validation**
  - Accepts a complete valid workflow response.
  - Rejects missing required fields.
  - Rejects out-of-range probabilities.
  - Rejects invalid enum values.
  - Handles optional fields without crashing.
  - Verifies final disclaimer is present.

- **Kalshi market-data tool**
  - Uses mocked HTTP fixtures.
  - Parses market title, ticker, close time, status, prices, volume, and orderbook summary.
  - Handles missing or empty orderbook data.
  - Handles thin liquidity and stale-market warnings.
  - Does not require trading credentials for MVP.

- **Settlement-risk audit**
  - Flags ambiguous titles.
  - Flags close-time and resolution-source gotchas.
  - Flags markets where the user’s intuitive question differs from the contract’s exact wording.
  - Produces severity-bounded risk objects.

- **Probability scoring and confidence logic**
  - Clamps probabilities to valid range.
  - Computes delta consistently.
  - Separates confidence from probability.
  - Handles low-evidence cases by lowering confidence.
  - Avoids returning a false sense of certainty.

- **Evidence normalization**
  - Stores claim, source title, optional source URL, and relevance.
  - Deduplicates obviously repeated sources.
  - Requires enough evidence to support a medium/high confidence claim.
  - Keeps source metadata separate from generated memo prose.

- **AG2 workflow orchestrator**
  - Runs the fixed six-agent sequence with mocked tools.
  - Produces one trace entry per agent.
  - Produces strict JSON.
  - Propagates recoverable errors into typed error responses.
  - Does not leak API keys or raw secrets into output.

- **UI result mapper**
  - Converts validated JSON into view sections.
  - Shows all required cards.
  - Handles missing optional fields gracefully.
  - Shows disclaimer.
  - Shows fallback demo fixture when enabled.

- **React UI behavior**
  - Idle state renders input and example picker.
  - Loading state renders progress.
  - Success state renders memo and agent trace.
  - Error state renders retry and demo fallback.
  - Developer toggle can show validated raw JSON.

- **Safety language checks**
  - Output rendering should not show “buy,” “sell,” or “place a trade” as product-authored recommendation labels.
  - Disclaimer should be visible in success state.
  - Research signal should be framed as non-advice.

Quality gates:

- Frontend lint must pass.
- Frontend type check must pass.
- Frontend tests must pass.
- Python/AG2 lint must pass where the workflow code is implemented.
- Python/AG2 tests must pass where the workflow code is implemented.
- Formatting should be deterministic and runnable with one command per side.
- A final pre-demo checklist should run lint, typecheck, tests, and a demo fixture render.

Prior art from the inspected project ecosystem:

- Existing issue workflow uses long-form PRD issues with `needs-triage`.
- Existing issues emphasize acceptance criteria, explicit safety boundaries, and verification checks.
- Existing code ecosystem is comfortable with typed JavaScript/TypeScript-style contracts and test commands.
- For AG2-specific implementation, use the AG2 build-with-ag2 examples and skills as the closest implementation reference.

## Out of Scope

- Real-money trading.
- Authenticated Kalshi trading operations.
- Buy/sell recommendations.
- Portfolio tracking.
- User accounts.
- Payment handling.
- Persistent user history beyond local demo convenience.
- Production compliance review.
- Natural-language market discovery for MVP.
- Live Kalshi WebSocket monitoring for MVP.
- Cross-market arbitrage or contradiction detection for MVP.
- Complex statistical modeling.
- Backtesting.
- Automated trading.
- Multi-user collaboration.
- Custom Next.js server.
- Secret-bearing Next.js API routes.
- Browser-side calls to Tavily, Gemini, or secret-bearing AG2 endpoints.
- Full production observability.
- Mobile-specific UX beyond responsive layout.
- Long-term storage of agent traces.
- Guaranteeing factual correctness of live research output.
- Replacing the final human judgment of the researcher.
- Turning the project into general financial advice software.

## Further Notes

- The MVP should be optimized for a same-day hackathon: fewer moving parts, strong demo story, clear agent roles, and a reliable fallback fixture.
- The final demo should begin with a single market input and end with a polished memo, not with architecture diagrams.
- The presentation should explicitly say that the product is research-only and does not execute or recommend trades.
- The strongest prize narrative is “Best Multi-Agent Collaboration”: each agent has a clearly bounded role and contributes to a result that is better than one generic model response.
- The research prize narrative is also credible: the same workflow could help researchers evaluate forecasts, data releases, settlement definitions, and evidence quality.
- The AG2 skills repository provided by the user should be added to the implementation checklist as the day-of-build reference.
- The app should be named in the UI as **Kalshi Research Swarm** or a similarly direct name.
- Suggested tagline: “Market price vs. agent-estimated probability, with evidence and skepticism.”
- Suggested demo script:
  1. Paste market URL or ticker.
  2. Show agents working.
  3. Show market-implied probability.
  4. Show agent estimate and delta.
  5. Show evidence.
  6. Show Skeptic Agent objections.
  7. Show settlement-risk audit.
  8. End with research-only disclaimer and what would change the estimate.
- Suggested stretch goals after MVP:
  - Natural-language market search.
  - Streaming AG2 progress events.
  - Cross-market consistency checks.
  - Watchlist.
  - Shareable memo export.
  - Historical memo comparison.
  - Better quantitative models per market category.

# Python AG2 Workflow

This runtime owns secret-bearing work outside the browser: Kalshi public market data access, Tavily search, Gemini-backed reasoning through AG2, and the fixed six-agent workflow.

The Python workflow returns one validated Workflow Response Contract per analyzed Kalshi market. The frontend calls this runtime over HTTP or a hosted AG2 endpoint; it must not import Python code or call secret-bearing providers directly.

## Planned Modules

- `app/main.py`: HTTP entrypoint if the workflow runs as a Python service.
- `app/orchestrator/`: AG2 six-agent workflow composition.
- `app/agents/`: agent role definitions for Market Data, Settlement Rules, Research, Probability Estimator, Skeptic, and Memo Editor.
- `app/tools/`: Kalshi and Tavily adapters.
- `app/scoring/`: probability, confidence, and delta rules.
- `app/settlement/`: settlement-risk audit.
- `app/evidence/`: evidence normalization and citation handling.
- `app/contracts/`: Python-side request/response validation before emitting JSON.
- `tests/`: mocked workflow and adapter tests.

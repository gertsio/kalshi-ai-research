# Python AG2 Workflow API

This runtime owns secret-bearing work outside the browser: Kalshi market data access, Tavily search, Gemini-backed reasoning through AG2, and the fixed six-agent workflow.

The MVP exposes a local FastAPI seam with a deterministic demo path. It returns one validated Workflow Response Contract per analyzed Kalshi market and does not expose Gemini, Tavily, Kalshi, or AG2 credentials in responses or browser-facing config.

## Endpoints

- `GET /health`: returns `{ "status": "ok" }`.
- `POST /analyze`: accepts `{ "marketInput": string, "requestedAt"?: ISO datetime, "demoMode"?: boolean }`.

`POST /analyze` currently supports demo/mock mode only. Omit `demoMode` or set it to `true` for the deterministic fixture. Set `demoMode` to `false` to receive a typed `workflow_unavailable` error until the live AG2 workflow is connected.

## Local Setup

Install dependencies with `uv`:

```bash
uv sync --dev
```

Start the API:

```bash
uv run uvicorn app.main:app --reload
```

Test the API:

```bash
curl http://127.0.0.1:8000/health
curl -X POST http://127.0.0.1:8000/analyze \
  -H 'content-type: application/json' \
  -d '{"marketInput":"KXEXAMPLE-26MAY03-DEMO","demoMode":true}'
```

## Checks

Run formatting, linting, type checking, and tests:

```bash
uv run ruff format .
uv run ruff check .
uv run mypy app tests
uv run pytest
```

## CORS

Local CORS allows `http://localhost:3000` and `http://127.0.0.1:3000` by default. Override with the `WORKFLOW_CORS_ALLOW_ORIGINS` setting when the frontend origin is known, and restrict it before deployment.

## Structure

- `app/main.py`: FastAPI application factory, CORS, request IDs, and typed error handlers.
- `app/api/routes.py`: thin HTTP route handlers.
- `app/contracts/workflow.py`: Python-side Workflow Request Contract, Workflow Response Contract, and error boundaries.
- `app/fixtures/demo_response.py`: deterministic validated demo Workflow Response Contract.
- `app/orchestrator/service.py`: workflow service seam for demo mode now and AG2 later.
- `tests/`: HTTP and contract validation tests.

Auth, database, repositories, user management, and live trading are out of scope for this MVP service.

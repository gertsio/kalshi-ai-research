# Kalshi Research Swarm

Research-only prediction-market analysis for Kalshi markets, powered by a typed Next.js frontend and a separate Python workflow runtime.

Kalshi Research Swarm compares Kalshi's market-implied probability with an agent-generated estimate, then frames the difference with evidence, counterarguments, settlement risks, warnings, and a concise memo. It is built as a hackathon-friendly prototype with strict contracts and deterministic demo behavior.

> [!IMPORTANT]
> This project is for research assistance only. It does not execute trades, place orders, manage portfolios, or provide financial advice.

## Features

- Paste a Kalshi market ticker or URL and move through a research memo flow.
- Validate workflow responses with a strict shared contract before rendering.
- Compare Kalshi implied probability against an agent-estimated probability.
- Preserve a six-agent workflow shape: market data, settlement rules, research, probability estimation, skepticism, and memo editing.
- Run a deterministic demo fixture when live workflow dependencies are unavailable.
- Keep secret-bearing work outside the browser in a FastAPI workflow service.
- Ship with linting, formatting, type checking, and tests for core frontend and workflow seams.

## Architecture

```text
Next.js app
  app/                         App Router entry points
  components/                  Presentational UI components
  features/research-memo/      UI state and view-model logic
  contracts/workflow/          TypeScript workflow schemas and fixtures

Python workflow API
  workflow-python/app/api/     FastAPI routes
  workflow-python/app/tools/   Kalshi market data and Tavily research tools
  workflow-python/app/orchestrator/
                               Workflow service and six-agent seam
  workflow-python/tests/       Python contract and API tests
```

The browser-facing app never calls Gemini, Tavily, or other secret-bearing providers directly. Those integrations live behind `workflow-python/`, which returns one validated Workflow Response Contract per analyzed market.

## Workflow

The intended live workflow is a fixed six-agent pass:

| Agent                       | Responsibility                                                                  |
| --------------------------- | ------------------------------------------------------------------------------- |
| Market Data Agent           | Fetch public Kalshi market data, prices, spread, volume, and orderbook context. |
| Settlement Rules Agent      | Inspect resolution criteria, close time, settlement source, and ambiguity.      |
| Research Agent              | Gather evidence from web search and normalize source metadata.                  |
| Probability Estimator Agent | Convert evidence and assumptions into a bounded probability estimate.           |
| Skeptic Agent               | Challenge weak assumptions and surface counterarguments.                        |
| Memo Editor Agent           | Produce strict JSON and final memo text for the UI.                             |

The current service supports a deterministic demo path by default. Live mode uses the public Kalshi API plus Tavily search when configured.

## Prerequisites

- Node.js 22 or newer recommended
- npm
- Python 3.12 or newer
- `uv` for Python dependency management

## Quickstart

Install frontend dependencies:

```bash
npm install
```

Copy the environment template:

```bash
cp .env.example .env
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Run The Workflow API

From the Python service directory:

```bash
cd workflow-python
uv sync --dev
uv run uvicorn app.main:app --reload
```

Health check:

```bash
curl http://127.0.0.1:8000/health
```

Analyze with the deterministic demo fixture:

```bash
curl -X POST http://127.0.0.1:8000/analyze \
  -H 'content-type: application/json' \
  -d '{"marketInput":"KXEXAMPLE-26MAY03-DEMO","demoMode":true}'
```

> [!NOTE]
> `POST /analyze` defaults to demo mode unless `demoMode` is explicitly set to `false`.

## Configuration

Root `.env.example`:

```bash
NEXT_PUBLIC_WORKFLOW_ENDPOINT="http://127.0.0.1:8000/analyze"
```

The frontend only needs `NEXT_PUBLIC_WORKFLOW_ENDPOINT`. Do not put Gemini, Tavily, Kalshi private, or other secret-bearing API keys in root browser-facing environment variables.

Workflow service settings use the `WORKFLOW_` prefix from `workflow-python/app/core/config.py`:

| Variable                      | Purpose                                           |
| ----------------------------- | ------------------------------------------------- |
| `WORKFLOW_TAVILY_API_KEY`     | Enables live Tavily-backed evidence search.       |
| `WORKFLOW_CORS_ALLOW_ORIGINS` | Overrides local frontend origins allowed by CORS. |

Local CORS allows `http://localhost:3000` and `http://127.0.0.1:3000` by default.

## Development Commands

Frontend:

| Command                | Description                                   |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start the Next.js dev server.                 |
| `npm run build`        | Build the Next.js app.                        |
| `npm run start`        | Start the production server after a build.    |
| `npm run lint`         | Run ESLint.                                   |
| `npm run format:check` | Check Prettier formatting.                    |
| `npm run typecheck`    | Run TypeScript without emitting files.        |
| `npm run test`         | Run Vitest tests.                             |
| `npm run check`        | Run typecheck, lint, format check, and tests. |

Python workflow API:

```bash
cd workflow-python
uv run ruff format .
uv run ruff check .
uv run mypy app tests
uv run pytest
```

## API Contract

`POST /analyze` accepts:

```json
{
  "marketInput": "KXEXAMPLE-26MAY03-DEMO",
  "requestedAt": "2026-05-03T00:00:00Z",
  "demoMode": true
}
```

It returns a validated workflow response containing:

- Market metadata and status.
- Kalshi probability data, bid/ask, spread, volume, and staleness or liquidity warnings.
- Agent estimate, confidence, thesis, and assumptions.
- Delta between agent estimate and Kalshi implied probability.
- Evidence, counterarguments, settlement risks, and what-would-change bullets.
- Agent trace for the six workflow roles.
- Final memo markdown, developer inspection metadata, and a research-only disclaimer.

The TypeScript contract lives in `contracts/workflow/workflow-contract.ts`. The Python contract lives in `workflow-python/app/contracts/workflow.py`.

## Project Structure

| Path                      | Description                                                                   |
| ------------------------- | ----------------------------------------------------------------------------- |
| `app/`                    | Next.js App Router pages, layout, and global styles.                          |
| `components/`             | UI components and research-only safety language.                              |
| `features/research-memo/` | State reducer, hook, examples, and result view model.                         |
| `contracts/workflow/`     | Zod schemas and deterministic workflow fixture.                               |
| `tests/`                  | Frontend behavior and contract tests.                                         |
| `workflow-python/`        | FastAPI workflow runtime for market data, search, scoring, and orchestration. |
| `docs/`                   | Architecture notes and product requirements.                                  |
| `CONTEXT.md`              | Domain language and project framing.                                          |

## Safety Boundaries

- No trading credentials are required for the MVP.
- No authenticated Kalshi trading endpoints are used.
- Secret-bearing providers stay outside the browser.
- Workflow output is structured JSON, not arbitrary free-form HTML.
- The UI frames differences as research signals, not buy or sell instructions.

## Current Status

This repository is an MVP prototype. The frontend renders idle, loading, explicit error, and validated research-memo success states. The Python workflow API exposes `GET /health` and `POST /analyze`, with deterministic demo mode available immediately and live-market seams for Kalshi public data and Tavily evidence search.

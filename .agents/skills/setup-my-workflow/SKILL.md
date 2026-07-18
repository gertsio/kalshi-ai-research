---
name: setup-my-workflow
description: Sets up a repo to use the maintainer's local-first docs/work workflow, including AGENTS.md/CLAUDE.md agent guidance, docs/agents tracker docs, triage labels, domain/context-map rules, starter context docs, and docs/work manifests. Use before running to-spec, to-tickets, triage, diagnosing-bugs, tdd, improve-codebase-architecture, or other engineering skills in a repo that should track work through docs/work.
disable-model-invocation: true
---

# Setup My Workflow

Scaffold the maintainer's repo workflow for engineering skills:

- `docs/work/` is the canonical spec and ticket tracker.
- `docs/agents/` tells skills how to find tracker state, triage labels, and domain docs.
- `CONTEXT-MAP.md` and `docs/contexts/<domain>/CONTEXT.md` are created when the repo needs mapped context.
- `AGENTS.md` or `CLAUDE.md` gets a compact `## Agent skills` block.

This is prompt-driven, not a script. Explore first, show the planned edits, then write only after the user confirms if anything is ambiguous or destructive.

## Quick Start

1. Read the target repo's root guidance: `AGENTS.md` or `CLAUDE.md`, `README.md`, `CONTEXT.md`, `CONTEXT-MAP.md`, and `docs/contexts/`.
2. Inspect existing `docs/agents/`, `docs/work/`, `docs/adr/`, and remote issue tracker clues.
3. Decide whether the repo is single-context (`CONTEXT.md`) or mapped-context (`CONTEXT-MAP.md`).
4. Install or update:
   - `## Agent skills` block in the existing root agent file.
   - `docs/agents/issue-tracker.md`
   - `docs/agents/triage-labels.md`
   - `docs/agents/domain.md`
   - `CONTEXT-MAP.md` plus `docs/contexts/<domain>/CONTEXT.md` when using mapped context
   - `docs/work/AGENTS.md`
   - `docs/work/index.json` if missing.
5. If the user wants a starter queue, create one workstream under `docs/work/<workstream>/` with `AGENTS.md`, `prds.json`, and a first spec package skeleton. The local schema still uses `prd` and `issue` filenames/keys for compatibility; treat those as spec and ticket records.

## Defaults

Use these defaults unless repo evidence or the user says otherwise:

- Tracker: local-first `docs/work/`.
- Triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`.
- Workstream slug: ask if not obvious from repo purpose.
- Domain docs: single-context when root `CONTEXT.md` is clearly enough; mapped-context when the repo has multiple domains or should use `docs/contexts/**/CONTEXT.md`.

## Workflow

Follow [REFERENCE.md](./REFERENCE.md) for the full explore, decision, edit, and verification flow. Use templates from [templates/](./templates/) as seeds, adapting repo names and paths.

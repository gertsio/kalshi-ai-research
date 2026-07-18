# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Layout

This is a single-context repo. Use root `CONTEXT.md` and root `docs/adr/` for architectural decisions.

## ADR threshold

Create or update ADRs only for decisions with long-lived architectural weight:
ownership boundaries, data contracts, deployment and exposure posture,
irreversible tradeoffs, or choices future work is likely to challenge months
later.

Do not create ADRs for local setup, helper APIs, reversible implementation
details, single-issue discoveries, or command syntax. Put those in code,
tests, package docstrings, README/runbook notes, or the active ticket instead.

## Before exploring, read these

- `CONTEXT.md` at the repo root.
- `docs/adr/` for ADRs that touch the area you're about to work in.

If any of these files don't exist, proceed silently. Don't flag their absence; don't suggest creating them upfront. The producer skill (`/grill-with-docs`) creates them lazily when terms or decisions actually get resolved.

## Use the glossary's vocabulary

When your output names a domain concept in an issue title, refactor proposal, hypothesis, or test name, use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use, or there's a real gap to note for `/grill-with-docs`.

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding.

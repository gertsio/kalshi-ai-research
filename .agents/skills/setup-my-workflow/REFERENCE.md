# Setup My Workflow Reference

## 1. Explore

Read existing repo state before suggesting edits:

- `AGENTS.md` and `CLAUDE.md`: choose the existing file; do not create the other one if one exists.
- `README.md`, `CONTEXT.md`, `CONTEXT-MAP.md`, `docs/contexts/`, and `docs/adr/`: determine domain-doc layout.
- `docs/agents/`: preserve useful existing tracker, labels, and domain rules.
- `docs/work/`: detect whether the local tracker already exists.
- Existing spec/ticket queues: preserve IDs, statuses, and order.

If `docs/work/` already exists, resolve it with `python3 docs/work/work.py list` before changing workflow docs. A repo still on the v1 schema — `prds.json`/`issues.json`, stored `blocked` statuses, or `active_*`/`next_*` pointers — is migrated with `work.py migrate` (preview first, then `--write`); rename the files to `specs.json`/`tickets.json` and the `issues/` directory to `tickets/` in the same pass.

## 2. Decisions To Confirm

Ask only when the answer is not clear from repo evidence.

### Canonical Tracker

Default answer: `docs/work/` is canonical.

Explain: engineering skills create, triage, and complete work by editing local Markdown and JSON manifests. Remote trackers are projections only.

### Domain Layout

Use one of:

- Single-context: root `CONTEXT.md` plus root `docs/adr/`.
- Mapped-context: root `CONTEXT-MAP.md` points to `docs/contexts/**/CONTEXT.md` plus root `docs/adr/`.

### Context Files

If mapped context is selected and `CONTEXT-MAP.md` is missing, create it from `templates/context-map.md`. Also create a starter `docs/contexts/<primary-domain>/CONTEXT.md` from `templates/context.md`. Use repo/domain language from existing docs; do not invent a broad architecture map.

### Starter Workstream

If the repo has no `docs/work/index.json`, ask for or infer one workstream slug. Use repo purpose, not broad labels like `misc`.

## 3. Root Agent Block

Update the existing root `AGENTS.md` or `CLAUDE.md`. If both exist, edit the one that already contains repo operating rules. If neither exists, ask which to create.

Use this block, adapting single-context vs mapped-context wording:

```markdown
## Agent skills

### Issue tracker

Specs and tickets are local-first under `docs/work/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default five-label triage vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repo using root `CONTEXT.md` and root `docs/adr/` for architectural decisions. See `docs/agents/domain.md`.
```

For mapped-context repos, replace the Domain docs paragraph with:

```markdown
This is a mapped-context repo. Read root `CONTEXT-MAP.md`, then the relevant context file and root `docs/adr/` when present. See `docs/agents/domain.md`.
```

If an `## Agent skills` block already exists, update it in place. Do not duplicate it.

## 4. Context Files

For mapped-context repos, create missing context scaffolding before writing `docs/agents/domain.md`:

- `CONTEXT-MAP.md` from `templates/context-map.md`.
- `docs/contexts/<primary-domain>/CONTEXT.md` from `templates/context.md`.

Keep context files short and honest. Seed only confirmed domain language, relationships, example dialogue, and flagged ambiguities. If the repo is single-context and root `CONTEXT.md` already exists, do not force a map.

## 5. docs/agents Files

Create or update:

- `docs/agents/issue-tracker.md` from `templates/issue-tracker.md`.
- `docs/agents/triage-labels.md` from `templates/triage-labels.md`.
- `docs/agents/domain.md` from either `templates/domain-single.md` or `templates/domain-mapped.md`.

The issue tracker doc must say:

- `docs/work/` is canonical and `docs/work/work.py` resolves it.
- Read order is `docs/work/index.json` -> workstream `specs.json` -> spec package `tickets.json`.
- Manifests store only intrinsic state: status and `blocked_by`.
- Blockedness, the frontier, and next/active are derived on read, never stored.
- Ticket files own acceptance criteria and outcome; the manifest owns dependency.
- Workstream `AGENTS.md` owns run policy and human-feedback gates, never the queue.

## 6. docs/work Files

Create only missing scaffolding unless the user asked to reset.

Minimum root:

```text
docs/work/
  AGENTS.md
  work.py
  index.json
```

Starter workstream:

```text
docs/work/<workstream>/
  AGENTS.md
  specs.json
  <NNN-spec-slug>/
    spec.md
    tickets.json
    tickets/
      <NNN-slug>.md
```

Copy `templates/work.py` verbatim; it is the tracker's read and write
interface and must not be edited per repo. Number IDs from `001` within their
package. Keep local IDs canonical even if a remote issue later exists.

## 7. Manifest Rules

Manifests store only intrinsic state — what nothing can compute. Anything
derivable is computed by `work.py` on read, so it cannot drift.

Root `docs/work/index.json` owns:

- `schema_version`, `repo`, `active_workstream`
- `workstreams[]` with `id`, `title`, `folder`, and `status`

Workstream `specs.json` owns spec-package state:

- `specs[]` with `id`, `title`, `folder`, and `status`

Package `tickets.json` owns ticket state:

- `tickets[]` with `id`, `title`, `file`, `status`, and `blocked_by`

Statuses are `draft`, `ready`, `active`, `ready-for-human`, `completed`,
`cancelled`, `archived`. There is no `blocked` status and no `active_*` /
`next_*` / `rank` / `queue_policy` field: a blocked ticket is `ready` with an
open blocker, and the frontier is a query. Timestamps belong to git.

## 8. Skill Semantics

When another skill says "publish to the issue tracker": create/update local docs/work files and manifests.

When another skill says "fetch the relevant ticket": run `python3 docs/work/work.py next` (or `show <id>`) and read the ticket file it names.

When work completes: `python3 docs/work/work.py set <id> completed`. That is the whole update — the next frontier recomputes itself. Touch the workstream `AGENTS.md` only if run policy or a human gate changed.

## 9. Verification

After writing:

- Read the edited files back.
- Run `python3 docs/work/work.py check`; it validates JSON, ids, edges, cycles, missing files, orphan tickets, and any derived state that crept back in.
- Confirm there is exactly one `## Agent skills` block in the chosen root agent file.
- Confirm `docs/agents/issue-tracker.md` says `docs/work/` is canonical.
- Confirm `work.py check` runs in the repo's gate.
- For mapped-context setup, confirm `CONTEXT-MAP.md` points at real `docs/contexts/**/CONTEXT.md` files.
- Summarize what was created and how to start the first spec/ticket.

# Setup My Workflow Reference

## 1. Explore

Read existing repo state before suggesting edits:

- `AGENTS.md` and `CLAUDE.md`: choose the existing file; do not create the other one if one exists.
- `README.md`, `CONTEXT.md`, `CONTEXT-MAP.md`, `docs/contexts/`, and `docs/adr/`: determine domain-doc layout.
- `docs/agents/`: preserve useful existing tracker, labels, and domain rules.
- `docs/work/`: detect whether the local tracker already exists.
- Existing spec/ticket queues: preserve IDs, statuses, and rank/order. If the repo uses the older `prd` and `issue` filenames or manifest keys, keep them stable and treat them as spec and ticket records.

If `docs/work/` already exists, read `docs/work/index.json`, then the active workstream manifest (`prds.json` in the compatibility schema), then the selected spec package manifest (`issues.json` in the compatibility schema) before changing workflow docs.

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

- `docs/agents/issue-tracker.md` from `templates/issue-tracker-docs-work.md`.
- `docs/agents/triage-labels.md` from `templates/triage-labels.md`.
- `docs/agents/domain.md` from either `templates/domain-single.md` or `templates/domain-mapped.md`.

The issue tracker doc must say:

- `docs/work/` is canonical.
- Read order is `docs/work/index.json` -> workstream manifest (`prds.json`) -> spec package manifest (`issues.json`).
- Use `active_*` before `next_*` unless the user names a target.
- Manifests own order, status, and IDs.
- Ticket files own acceptance criteria and blocker notes.
- Workstream `AGENTS.md` owns temporary sequencing, run policy, and human-feedback gates.

## 6. docs/work Files

Create only missing scaffolding unless the user asked to reset.

Minimum root:

```text
docs/work/
  AGENTS.md
  index.json
```

Starter workstream:

```text
docs/work/<workstream>/
  AGENTS.md
  prds.json          # spec package manifest; compatibility filename
  <NNN-spec-slug>/
    prd.md           # spec document; compatibility filename
    issues.json      # ticket manifest; compatibility filename
    issues/          # ticket files; compatibility directory
      <NNN-slug>.md
```

Use IDs shaped like `<workstream-prefix>-prd-001` and `<workstream-prefix>-prd-001-iss-001` in repos already on the compatibility schema. For new queues, prefer neutral slugs in titles and folder names, but do not rename existing IDs just for vocabulary. Keep local IDs canonical even if a remote issue later exists.

## 7. Manifest Rules

Root `docs/work/index.json` owns:

- `schema_version`
- `repo`
- `updated_at`
- `active_workstream`
- `workstreams[]` with `id`, `title`, `folder`, `manifest`, and `status`

Workstream `prds.json` owns spec-package state:

- `active_prd`, `next_prd`
- valid statuses
- `prds[]` with paths and status

Package `issues.json` owns ticket state:

- `active_issue`, `next_issue`, `next_issue_number`
- `queue_policy`
- `issues[]` with status, type, rank, blockers, and labels

## 8. Skill Semantics

When another skill says "publish to the issue tracker": create/update local docs/work files and manifests.

When another skill says "fetch the relevant ticket": read the local manifests to resolve the selected ticket, then read the referenced Markdown ticket file.

When work completes: update the ticket status and manifests first, then update the workstream `AGENTS.md` if queue sequencing or run policy changed. Delete stale notes instead of appending history.

## 9. Verification

After writing:

- Read the edited files back.
- Check JSON syntax for all touched manifest files.
- Confirm there is exactly one `## Agent skills` block in the chosen root agent file.
- Confirm `docs/agents/issue-tracker.md` says `docs/work/` is canonical.
- For mapped-context setup, confirm `CONTEXT-MAP.md` points at real `docs/contexts/**/CONTEXT.md` files.
- Summarize what was created and how to start the first spec/ticket.

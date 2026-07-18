# Issue Tracker

`docs/work/` is the canonical tracker for specs and tickets. Every skill
instruction about an issue tracker resolves here: read "PRD" or "spec" as a
spec package, "issue" or "ticket" as a ticket file, and "publish to the
tracker" as the Publishing steps below. This document owns tracker behavior
for this repo.

## Shape

```text
docs/work/
  index.json                 # workstream index; names the active workstream
  <workstream>/
    AGENTS.md                # run policy and human gates
    specs.json               # spec manifest: active_spec, next_spec, specs[]
    <NNN-spec-slug>/
      spec.md
      tickets.json           # ticket manifest: active_ticket, next_ticket, tickets[]
      tickets/<NNN-slug>.md
```

Spec manifests carry `id`, `title`, `file`, and `status`. Ticket manifests add
`blocked_by` (list of ticket ids). Neither manifest carries outcome notes.
Statuses: `draft`, `ready`, `ready-for-human`, `active`, `blocked`,
`completed`, `cancelled`, `archived`. A ticket is on the **frontier** when its
`status` is `ready` and every id in `blocked_by` is `completed`.

## Ownership

- Manifests own ids, status, order, `blocked_by`, and frontier pointers.
- Ticket files own the question, acceptance criteria, outcome, and remaining
  follow-up. Blocker prose supplies context; `blocked_by` determines dependency.
- Workstream `AGENTS.md` owns run policy and human-feedback gates.

## Reading Order

- `docs/work/index.json` → workstream `specs.json` → package `tickets.json`.
- Follow `active_*` first, then `next_*`, unless the user names a target.

## Publishing

- Specs: create or update `<NNN-spec-slug>/spec.md` and its `specs.json` entry.
- Tickets: create or update files under the package's `tickets/` directory and
  the package's `tickets.json`, in dependency order (blockers first); express
  blocking edges via `blocked_by`.

## Workflow

- Ticket files are not changelogs. Keep implementation notes only while they
  are actively useful; collapse completed work to outcome and remaining
  follow-up.
- After every ticket completion, block, cancellation, or reorder, update the
  manifest: clear `active_ticket` if it points at a non-frontier ticket and set
  `next_ticket` to the next frontier ticket or `null`. Update the workstream
  `AGENTS.md` only when run policy or a human gate changes; never copy the
  manifest queue into it.

## Documentation Scope

- Do not create new docs for every PR or small ticket.
- Prefer code, tests, and package docstrings for easily discoverable behavior.
- Use README/runbook notes for commands people actually run.
- Escalate to an ADR only when the decision meets the ADR threshold in `docs/agents/domain.md`.

## Remote Trackers

- Local IDs and paths are canonical. Remote IDs and URLs are metadata only.
- Remote descriptions do not replace local source text.

## Branch And PR Naming

- Identify the local ticket before creating implementation branches or PRs.
- Use the local ticket ID in names; remote keys are optional secondary metadata after publication.
- If no local ticket is known, ask whether to create or find one instead of inventing a ticket-less name.

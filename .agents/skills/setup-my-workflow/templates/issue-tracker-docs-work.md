# Issue Tracker

`docs/work/` is the canonical local tracker for specs and tickets.

The storage schema intentionally keeps the historical `prd` and `issue`
filenames/keys so existing queues stay stable. In current skill vocabulary,
read PRD as spec and issue as ticket.

## Shape

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

## Workflow

- Read `docs/work/index.json`, then the workstream `prds.json`, then the spec package `issues.json`.
- Use manifest `active_*` first, then `next_*`, unless the user names a target.
- Ticket files own acceptance criteria and blocker notes.
- Manifests own order, status, and IDs.
- Workstream `AGENTS.md` owns only compact temporary sequencing, run policy, and human-feedback gates.
- After every ticket completion, block, cancellation, or reorder, update manifests first: clear `active_issue` if it points at a non-frontier ticket, set `next_issue` to the next `ready` ticket or `null`, then update the workstream `AGENTS.md` so it still matches the current queue. Delete stale notes instead of adding history.

## Remote Trackers

- Local IDs and paths are canonical. Remote IDs and URLs are metadata only.
- Remote descriptions do not replace local source text.

## Branch And PR Naming

- Identify the local ticket before creating implementation branches or PRs.
- Use the local ticket ID in names; remote keys are optional secondary metadata after publication.
- If no local ticket is known, ask whether to create or find one instead of inventing a ticket-less name.

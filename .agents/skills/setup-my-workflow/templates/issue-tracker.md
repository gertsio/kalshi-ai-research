# Issue Tracker

`docs/work/` is the canonical tracker for specs and tickets. Every skill
instruction about an issue tracker resolves here: read "PRD" or "spec" as a
spec package, "issue" or "ticket" as a ticket file, and "publish to the
tracker" as the Publishing steps below. This document owns tracker behavior
for this repo.

## Shape

One queue needs no hierarchy — the spec packages are simply the directories
holding a `tickets.json`, discovered on disk:

```text
docs/work/
  work.py                    # the tracker CLI: resolves the frontier, validates state
  <NNN-spec-slug>/
    spec.md
    tickets.json             # ticket manifest: tickets[]
    tickets/<NNN-slug>.md
```

Several parallel streams declare themselves, adding a workstream layer above
the same packages:

```text
docs/work/
  work.py
  index.json                 # workstream index; names the active workstream
  <workstream>/
    AGENTS.md                # run policy and human gates
    specs.json               # spec manifest: specs[]
    <NNN-spec-slug>/         # as above
```

The commands are identical in both. Grow into the declared form when a second
stream actually exists, not before.

## Stored State Is Intrinsic Only

Manifests store only what nothing can compute: a record's own lifecycle
status, and each ticket's `blocked_by` edges. Statuses are `draft`, `ready`,
`active`, `ready-for-human`, `completed`, `cancelled`, `archived`.

Everything else is **derived by `work.py` on every call** and must never be
written into a manifest:

- **Blocked** — a ticket is blocked when any id in its `blocked_by` is not yet
  `completed`, `cancelled`, or `archived`. There is no `blocked` status; a
  blocked ticket is simply `ready` with open blockers.
- **Frontier** — every ticket that is `ready` with no open blockers.
- **Next / active** — the first frontier ticket; the ticket whose status is
  `active`. No `next_ticket`, `active_ticket`, `next_spec`, or `rank` field.

This is the whole anti-drift design: a fact stored once cannot disagree with
itself. `work.py check` fails if derived state reappears in a manifest.

## Using It

```sh
python3 docs/work/work.py next          # the ticket to work now
python3 docs/work/work.py frontier      # everything workable
python3 docs/work/work.py show <id>     # resolve one ticket to its file
python3 docs/work/work.py set <id> active
python3 docs/work/work.py check         # validate; runs in the repo gate
```

Resolve tickets with `work.py`, not by reading manifests by hand — it is
faster, it is deterministic, and it is the same answer the gate checks.
Add `--json` for machine-readable output, `--workstream` / `--spec` to
override the automatic selection.

## Ownership

- Manifests own ids, order, status, and `blocked_by`.
- Ticket files own the question, acceptance criteria, outcome, and remaining
  follow-up. Blocker prose supplies context; `blocked_by` decides dependency.
- Workstream `AGENTS.md` owns run policy and human-feedback gates, never the
  queue.

## Reading Order

`docs/work/index.json` → workstream `specs.json` → package `tickets.json`.
`work.py` follows the active workstream, then the active spec package, then
the first ready one, unless the user names a target.

## Publishing

- Specs: create or update `<NNN-spec-slug>/spec.md` and its `specs.json` entry.
- Tickets: create or update files under the package's `tickets/` directory and
  the package's `tickets.json`, in dependency order (blockers first); express
  blocking edges via `blocked_by`.

Run `work.py check` after publishing.

## Workflow

- Ticket files are not changelogs. Keep implementation notes only while they
  are actively useful; collapse completed work to outcome and remaining
  follow-up.
- Completing a ticket is one write: `work.py set <id> completed`. Nothing else
  needs updating — the next frontier recomputes itself.
- Update the workstream `AGENTS.md` only when run policy or a human gate
  changes; never copy the queue into it.

## Documentation Scope

- Do not create new docs for every PR or small ticket.
- Prefer code, tests, and package docstrings for easily discoverable behavior.
- Use README/runbook notes for commands people actually run.
- Escalate to an ADR only when the decision meets the ADR threshold in
  `docs/agents/domain.md`.

## Remote Trackers

- Local IDs and paths are canonical. Remote IDs and URLs are metadata only.
- Remote descriptions do not replace local source text.

## Branch And PR Naming

- Identify the local ticket before creating implementation branches or PRs.
- Use the local ticket ID in names; remote keys are optional secondary
  metadata after publication.
- If no local ticket is known, ask whether to create or find one instead of
  inventing a ticket-less name.

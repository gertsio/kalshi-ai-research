---
name: ship
description: Ship ticket work through staging with a cross-model verdict at every merge boundary.
disable-model-invocation: true
---

# Ship

Ship through a work-package staging branch. Ticket PRs buy confidence with
repository checks, internal review, and an independent cross-model verdict.
Codex advisory, Fable `/simplify`, and CodeRabbit review the integrated work
package, where their broader perspective has the highest value.

A ticket is shipped when its PR is merged into staging. A work package is
shipped when the staging PR is merged into the final base and its tracker
reflects that state. A local commit, open PR, green local gate, or review
placeholder is an intermediate state.

## Resolve and route

Before editing:

1. Resolve the authoritative ticket or completed work package, its acceptance
   criteria, tracker frontier, repository gate, PR rules, final base, and one
   staging branch based on that final base. Follow the repository's tracker
   contract; when it provides a resolver — `docs/work/work.py next` — use it
   instead of reading manifests by hand, and never write back derived state it
   computes.
2. Inspect branch, worktree, existing PRs, and tracker state. Preserve unrelated
   changes.
3. Read [REVIEW.md](REVIEW.md) and record the review allocation.
4. Route exactly one branch:
   - When a ticket remains, read [TICKET.md](TICKET.md) and ship only that ticket
     into staging.
   - When every ticket and human gate is complete, read
     [FINAL-INTEGRATION.md](FINAL-INTEGRATION.md) and ship staging into the final
     base.

Ask one focused question only when branch ownership or a material product
decision cannot be discovered locally.

If the user requests a continuous work-package run, repeat the ticket branch
one ticket and one PR at a time, then take the final-integration branch. Never
stack unreviewed tickets or bundle their PRs.

Completion: exactly one routed branch reached its own completion criterion, or
the explicit user stopping boundary is named without calling the work shipped.

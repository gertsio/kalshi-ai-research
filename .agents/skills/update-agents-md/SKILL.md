---
name: update-agents-md
description: Reconciles repository guidance after PRs, deploy changes, safety decisions, or workflow updates. Use after important changes, when documentation may have drifted, when implementation conflicts with an ADR or other guidance, or when the user asks what belongs in AGENTS.md.
---

# Reconcile Repository Guidance

Treat repository documentation as a living system. After an important change, reconcile the implemented behavior, the current operating contract, and the history of why decisions were made.

`AGENTS.md` is the compact entry point for future agents, not the whole knowledge base. ADRs preserve decision history, not permanent constraints. A conflict with existing guidance is a decision point: explicit evidence determines whether the implementation returns to the documented contract, the documentation evolves with a new decision, or unresolved intent is escalated to the user.

## Steps

1. Read the change's explicit decision record — user direction, ticket, or PR brief — and every `AGENTS.md` that applies to the changed paths, or the repository root when no paths changed. Follow only the routes those instructions select for this change, reading selectively as their read path directs across the Canonical Layers below. Let the repository instructions determine which layers exist and when to create them. Identify every place where the change creates drift, contradiction, or a missing instruction.
2. Resolve each conflict from that evidence:
   - When the decision record changes the contract, update the current-facing guidance. For a hard-to-reverse decision with real tradeoffs, use the repository's ADR lifecycle to record whether the new decision narrows, extends, deprecates, or supersedes the earlier one. Where no lifecycle convention exists, annotate the earlier ADR with its relationship to the new decision. A full supersession is bidirectional: the new ADR names the old one, and the old ADR's status — plus any index entry the repository keeps — points to the replacement.
   - When the decision remains current and the implementation violates it within the current task's scope, align the implementation.
   - When the intended state is not explicit, or the implementation change falls outside the current task, present the conflict and a recommendation to the user, then record follow-up work according to the repository's tracker contract when one is configured.
3. Reconcile the documentation at its canonical layer. Remove stale current-facing guidance, repair pointers and ADR lifecycle links, and keep each meaning in one authoritative place. Preserve ADR history by changing earlier ADRs only through the repository's status, findings, or relationship convention. Leave guidance unchanged where this change created no drift.
4. Review the resulting diff and search for stale terms or conflicting instructions. Report what evolved, including why no `AGENTS.md` edit was needed when the durable agent contract did not change.

The reconciliation is complete when every current-facing document that the applicable repository instructions route this change to is accounted for, every detected conflict is resolved or explicitly escalated with a recommendation, the current contract is unambiguous, and the decision history still explains how the repository arrived there.

## Canonical Layers

- Applicable `AGENTS.md` files: durable safety, access, and workflow instructions, plus pointers to deeper sources.
- Context maps and domain docs: domain language, operating models, boundaries, and long-lived concepts.
- Decision gates, ADRs, and their indexes: unresolved choices, hard-to-reverse decisions, their tradeoffs, and the lifecycle relationships between decisions.
- Project READMEs and runbooks: operator procedures and project-specific checks.
- Scripts and configuration: executable deploy and validation contracts.
- Issues, PRs, and logs: task history and ephemeral evidence.

Keep `AGENTS.md` short, current, operational, and free of duplicated detail. Keep every documentation layer free of secrets, credentials, auth profiles, logs, and ephemeral runtime output.

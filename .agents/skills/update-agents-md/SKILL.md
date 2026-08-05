---
name: update-agents-md
description: Reconciles repository guidance after PRs, deploy changes, safety decisions, or workflow updates. Use after important changes, when documentation may have drifted, when implementation conflicts with an ADR or other guidance, when accumulated guidance needs rightsizing, or when the user asks what belongs in AGENTS.md.
---

# Reconcile Repository Guidance

Treat repository documentation as a living system. After an important change, reconcile the implemented behavior, the current operating contract, and the history of why decisions were made.

`AGENTS.md` is a router, not a knowledge base: a couple of lines on what the repository is and where it currently stands, then the gotchas an agent cannot infer from the file tree, then pointers to whichever layer owns each detail. Anything a request would only sometimes need belongs one hop away, loaded when it applies. ADRs preserve decision history, not permanent constraints.

Guidance costs context and judgment even when it is accurate. A rule that pre-empts a decision the agent can make from surrounding context, a duplicated instruction that pulls against its twin in another layer, or detail parked upfront that most requests never reach — each is drift of the same kind as a stale fact.

## Steps

1. Read the change's explicit decision record — user direction, ticket, PR brief, review findings, and any implementation notes recording where the work deviated from its plan — and every `AGENTS.md` that applies to the changed paths, or the repository root when no paths changed. Follow only the routes those instructions select for this change, reading selectively as their read path directs across the Canonical Layers below. Let the repository instructions determine which layers exist and when to create them. Identify every place where the change creates drift, contradiction, or a missing instruction, and ask which unknowns the implementation had to resolve on its own: each is either a durable contract that now needs an owner, or a one-off that needs no record.
2. Resolve each conflict from that evidence:
   - When the decision record changes the contract, update the current-facing guidance. For a hard-to-reverse decision with real tradeoffs, use the repository's ADR lifecycle to record whether the new decision narrows, extends, deprecates, or supersedes the earlier one. Where no lifecycle convention exists, annotate the earlier ADR with its relationship to the new decision. A full supersession is bidirectional: the new ADR names the old one, and the old ADR's status — plus any index entry the repository keeps — points to the replacement.
   - When the decision remains current and the implementation violates it within the current task's scope, align the implementation.
   - When the intended state is not explicit, or the implementation change falls outside the current task, present the conflict and a recommendation to the user, then record follow-up work according to the repository's tracker contract when one is configured.
3. Reconcile the documentation at its canonical layer. Give each instruction exactly one owner and settle contradictions between layers instead of leaving a reader to arbitrate them. Prefer the executable layer whenever a rule can be carried by a test, type, script, or config, and let prose point at it rather than restate it. Remove stale current-facing guidance and repair pointers and ADR lifecycle links. Preserve ADR history by changing earlier ADRs only through the repository's status, findings, or relationship convention. Leave guidance unchanged where this change created no drift.
4. Cut what the change made unnecessary: guardrails that now only narrow judgment, instructions repeated across layers, and upfront detail that belongs behind a pointer. Keep a constraint where being wrong is expensive — safety, access, irreversible operations, or a real repository gotcha — and let judgment cover the rest.
5. Review the resulting diff and search for stale terms or conflicting instructions. Report what evolved, including why no `AGENTS.md` edit was needed when the durable agent contract did not change.

The reconciliation is complete when every current-facing document that the applicable repository instructions route this change to is accounted for, every detected conflict is resolved or explicitly escalated with a recommendation, the current contract is unambiguous and singly owned, guidance grew no more than the change required, and the decision history still explains how the repository arrived there.

## Canonical Layers

- Applicable `AGENTS.md` files: durable safety, access, and workflow instructions, plus pointers to deeper sources.
- Skills and reference docs: procedures, opinions, and team-specific practice loaded when a task calls for them.
- Context maps and domain docs: domain language, operating models, boundaries, and long-lived concepts.
- Decision gates, ADRs, and their indexes: unresolved choices, hard-to-reverse decisions, their tradeoffs, and the lifecycle relationships between decisions.
- Project READMEs and runbooks: operator procedures and project-specific checks.
- Tests, types, scripts, and configuration: executable contracts, and the highest-fidelity reference the repository has.
- Issues, PRs, and logs: task history and ephemeral evidence.

Keep `AGENTS.md` short, current, operational, and free of duplicated detail. Session memory and live tracker status are not documentation layers; leave them to memory and the tracker. Keep every documentation layer free of secrets, credentials, auth profiles, logs, and ephemeral runtime output.

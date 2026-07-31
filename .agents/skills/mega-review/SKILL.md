---
name: mega-review
description: Review large PRs, big branches, or skill changes through parallel lenses. Use when the user asks for a mega review, full review, comprehensive review, parallel review, harsh review of a big PR, architecture-aware review.
---

# Mega Review

Run a comprehensive review without mixing concerns. This skill is a thin orchestrator: pin the scope once, dispatch independent review lenses in parallel, then aggregate the results under separate headings.

## Process

### 1. Pin scope

Decide which substrate is being reviewed:

- **Diff review** - a branch, PR, or working-tree diff against a fixed point.
- **Architecture scan** - a whole codebase or named area, looking for deepening opportunities.
- **Skill review** - one or more skill files, looking for predictable agent behaviour.

For a diff review, resolve both the base and target before spawning subagents. If the user named a PR, branch, tag, commit, commit range, or comparison point, preserve that exact target. If the target is ambiguous, ask one focused question. Do not let subagents discover different diffs.

Completion criterion: one shared scope packet exists, or the run is blocked on a single missing scope answer.

### 2. Build the shared packet

For diff reviews, follow [`refs/diff-review.md`](refs/diff-review.md) to capture the diff command, commit list, changed files, spec source, standards source, and any skip reasons.

For architecture scans, follow [`refs/architecture-scan.md`](refs/architecture-scan.md) to read the domain context and ADRs before exploring.

For skill reviews, follow [`refs/skill-quality.md`](refs/skill-quality.md) to identify the skill files and their invocation mode.

Completion criterion: every selected branch has the source material it needs, or an explicit skip reason.

### 3. Select lenses

Use this substrate-to-lens matrix:

| Substrate | Lenses |
| --- | --- |
| Diff review | Standards, Spec, Behaviour/Test Risk, Strict Quality |
| Big or architecture-aware diff review | Standards, Spec, Behaviour/Test Risk, Strict Quality, Architecture |
| Diff review with changed skill files | Standards, Spec, Behaviour/Test Risk, Strict Quality, Skill Quality |
| Skill review only | Skill Quality |
| Architecture scan only | Architecture |
| Mixed request | Union of the relevant rows |

Diff-review lenses:

- **Standards** - documented repo standards only.
- **Spec** - requirement fidelity only; skip if no spec is available.
- **Behaviour/Test Risk** - likely bugs, regressions, and missing behavioural checks.
- **Strict Quality** - structural maintainability using [`refs/strict-quality.md`](refs/strict-quality.md).

Add **Architecture** when the user asks for a mega, full, comprehensive, architecture-aware, or big-PR review, or when the diff crosses several modules and the review would benefit from locality/leverage analysis.

Add **Skill Quality** when `.agents/skills/**`, `.codex/**/skills/**`, or another skill package changed, or when the user asks to review a skill.

Completion criterion: selected lenses are listed before subagents start, including whether Architecture is running as a diff scout or full scan.

### 4. Fan out

Spawn one subagent per selected lens in parallel. For a very large PR, shard a lens by module or changed area only when one agent cannot cover it without sampling. Shards must preserve lens isolation: `Strict Quality: affinity_index` and `Strict Quality: provenance` are allowed; `Strict Quality + Spec` is not.

Each subagent receives this packet:

- Base ref/SHA and target ref/SHA, when reviewing a diff.
- Exact diff, log, and changed-file commands.
- Changed files or assigned shard.
- Spec source and standards source, when applicable.
- Exactly one lens brief.
- Required output: coverage, findings ordered by severity, file/line or source evidence, skip reasons, and checks run.
- Non-goal: ignore findings outside the assigned lens.

Do not pass one subagent's output to another. The separation is the point.

If no subagent primitive is available, run the selected lenses sequentially with the same packet and output contract. Preserve separate notes and headings; do not blend concerns just because they ran in one context.

Completion criterion: every selected lens returns a report or has a recorded skip reason.

### 5. Aggregate

Follow [`refs/aggregation.md`](refs/aggregation.md). Keep headings separate. Do not choose one cross-axis winner. Do not let architecture opportunities masquerade as approval blockers unless they are concrete regressions introduced by the diff.

For an architecture-only full scan, the HTML report is the final artifact. Return the absolute path and ask which candidate the user wants to explore; do not force it into a PR-approval summary.

Completion criterion: the final report has one section per selected lens, citations where applicable, skip reasons where applicable, and a short count of findings per lens.

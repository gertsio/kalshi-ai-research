# Review

Internal lenses inform; the verdict decides; the verdict is cross-model.
Reviewer independence is a property of model family, not process boundary: a
fresh subagent of the implementing model is not trusted to judge its own
family's work, so wherever this contract allocates a verdict, it comes from a
family that did not write the diff. Simplification is not a verdict — a model
simplifies its own work well and judges it poorly. Where a tier allocates no
verdict, say so plainly — "no verdict was purchased" — never dress a
same-family pass as one.

Classify every diff on one axis: **routine** (small, mechanical, free of
contract, state, safety, or evidence surface), **contract-led** (authoritative
meaning changes dominate), or **code-bearing** (material executable change; a
mixed diff classifies as code-bearing and carries both lenses).

Freeze the intended base and head before each review wave. Reviewers receive
the authoritative ticket or work package, repository instructions, and exact
diff — not the implementer's justification — and remain read-only. The
implementing agent adjudicates every finding, fixes valid issues, and records
concise rationales for rejections. Repository rules and explicit user
instructions are minimum floors.

## Tiers

Ticket review is proportional. Declare the tier before implementing and record
it in the PR allocation block with the trigger that set it. Choosing a tier
after seeing how inconvenient the review would be is the failure this prevents.

- **Tier 0 — self-review.** Implementer self-review plus the repository gate.
- **Tier 1 — internal.** Tier 0 plus [`code-review`](../code-review/SKILL.md)
  internal lenses.
- **Tier 2 — verdict.** Tier 1 plus an opposite-family cross-model verdict on
  every hunk, allocated by authorship (below).
- **Tier 3 — heavy.** Tier 2 plus CodeRabbit. Genuinely important work; rare at
  ticket scope, reachable when the work warrants it.

**Tier 0 qualifies only when all hold:** the diff is non-authoritative
documentation or evidence notes, tracker or manifest state, read-only analysis
scripts, comment and typo fixes, test-only additions, or a mechanical refactor
already covered by a green gate — **and** no escalation trigger fires — **and**
nothing downstream — code, automation, an operator action, a release, or a
later ticket or decision — consumes or relies on the result.

**Escalation triggers force at least Tier 2.** Any one fires:

- behavior or authoritative meaning on a contract, boundary, invariant,
  documented gate, policy, or decision record — executable or in prose;
- authorization, authentication, secrets, or PII surface;
- money, cost, or billing computation;
- state, migration, or anything not trivially reversible;
- an interface a later ticket will build on;
- deleting or weakening an existing safeguard.

Anything ambiguous classifies upward. A tier is a floor, not a ceiling — raise
it whenever judgment says the work deserves more.

A ticket below Tier 2 buys no verdict of its own, but it is not unreviewed: its
diff is still inside the final work-package sweep, whose one Codex advisory —
which any such ticket forces, even for an otherwise-routine package — is its
independent opposite-family look before anything reaches the final base. That
advisory is a genuine opposite-family look only for a Claude-family-authored
diff, so both Tier 0 and Tier 1 require Claude-family authorship; a
Codex-authored diff classifies at Tier 2 or higher, where its verdict is the
orchestrator's own opposite-family review. That coverage is what makes the cheap
tiers safe rather than a hole; assurance never drops as the tier rises.

## Ticket PR into staging

Run the tier declared for this ticket. Every tier begins with self-review.

1. **Self-review — every tier:** the implementing agent reviews the whole diff
   for acceptance, accidental scope, changed contracts, generated files,
   secrets, and unrelated work, then re-verifies every acceptance criterion
   literally, item by item — intent-level rework is where named details get
   dropped. Revalidate the declared tier against the fixed diff; if the diff no
   longer meets that tier's qualifiers, reclassify upward before allocating
   review.
2. **Internal lenses — Tier 1+:** run [`code-review`](../code-review/SKILL.md)
   against the fixed integration point; keep its Standards and Spec axes
   separate when adjudicating.
3. **Verdict — Tier 2+:** an opposite-family verdict on every hunk (Codex
   mechanics below), with the lens matched to the classification. **Code lens:** wrong behavior against the accepted
   contract, missing or misleading tests, abstraction quality, and avoidable
   complexity, judged for an experimental prototype. **Contract lens:** wrong
   authority, missing decision, stale contradiction, unsafe authorization,
   dependency error, and ambiguous future action. Independence is per
   authorship — every hunk is judged by the family that did not write it. A
   fully Fable-authored diff takes the Codex pass. A fully Codex-authored diff
   whose orchestrator changed nothing beyond mechanical rebase takes the
   orchestrator's adversarial review — against the accepted contract and the
   evidence the rail already authorizes, within PII boundaries — as its
   cross-model verdict. A mixed diff takes both: the Codex pass over the
   Fable-authored hunks and the orchestrator's review over the Codex-authored
   hunks. The PR record names each verdict's fixed head and
   findings-or-no-findings result.
4. **CodeRabbit — Tier 3:** run per [CODERABBIT.md](CODERABBIT.md) when the work
   is important enough to warrant it.

Complete when every step the tier allocates is substantive and each finding is
fixed or rationalized against the accepted ticket contract. Below Tier 2 no
verdict is purchased; the PR record states that rather than implying an internal
one.

## Final work-package PR

1. Internal sweep: run [`mega-review`](../mega-review/SKILL.md) once over the
   complete final-base-to-staging diff (Architecture as a diff scout; include
   Skill Quality when skill files changed). Not per ticket. Report any ticket
   that shipped below Tier 2 so the cheap tiers stay auditable at the boundary.
2. A routine diff is the documented exception to the verdict rule: the sweep
   and repository checks are the whole budget — unless the package carried any
   ticket below Tier 2 (Tier 0 or 1), whose promised independent look is exactly
   this one Codex advisory; then run it over those enumerated diffs. Routine
   describes the diff, not the effort; any hunk touching an operating gate,
   boundary, or invariant classifies upward.
3. Otherwise run one Codex advisory and, when the diff is code-bearing, one
   Fable `/simplify` pass
   ([CLAUDE-SIMPLIFY.md](CLAUDE-SIMPLIFY.md)) in parallel against the same
   fixed head. The advisory packet includes the work-package spec and
   manifest, repository standards, changed files, commits, and exact diff
   commands — plus the authoritative ADR, policy, runbook, tracker, and
   instruction sources for contract-led work — and evaluates the problem
   globally: wrong boundaries, missing decisions, integration gaps,
   accidental complexity, and materially simpler alternatives. Every
   Codex-authored hunk already holds its opposite-family verdict from ticket
   scope — Tier 0 and 1 are Claude-authored, and Codex-authored work ships at
   Tier 2+ under the orchestrator's review — so this advisory is a
   global-integration lens, not the per-hunk verdict.
4. Mark the PR ready, then run two CodeRabbit passes per
   [CODERABBIT.md](CODERABBIT.md); a third only when the second causes
   material changes or the user asks.

After accepted fixes, rerun affected checks and the gate, then only a lens
whose evidence materially changed — a new head does not restart the matrix.
At most one targeted Codex follow-up per package. Package ceilings: three
substantive Codex passes, three CodeRabbit passes, two `/simplify` runs.

## Codex mechanics

Verify once before the phase that `codex` is logged in and that its
config-default model (`model` in `~/.codex/config.toml`) is the intended
GPT-5.6 tier — the review inherits that default, so a drifted config silently
weakens it. Write the packet to a prompt file — base and head SHAs, exact diff
command, authoritative work, assigned lens, and an instruction to separate
blockers from optional improvements with exact files and lines — then run
headless with a read-only sandbox against the frozen head:

```bash
d="/tmp/codex-review-<target>-<head-sha>-$(date +%s)"   # packet at $d/prompt.md
codex exec --json --sandbox read-only \
  -C <repo-root> \
  -c model_reasoning_effort=high \
  -o "$d/last-message.md" \
  - < "$d/prompt.md" > "$d/events.jsonl" 2> "$d/stderr.log"
```

The packet pins committed SHAs and instructs the reviewer to ignore
working-tree state. Run the command in a named tmux window or tracked
background task and arm a watcher on process exit and the last-message file
before treating it as in flight; the fresh run directory keeps a prior
same-head result from satisfying the watcher. Feed the prompt through stdin
(`-`) — a headless `codex exec` with open stdin waits for input forever —
and keep stderr out of the JSONL event stream.

## Completion accounting

A pass is usable when it identifies the reviewed head and returns substantive
findings or an explicit no-findings verdict; for `/simplify`, a coherent
summary, explicit no-op, or inspectable edit diff from the Fable model.
Placeholders, rate limits, silence, and obsolete-head reviews do not count; a
wrapper failure after a usable result does not erase it. A diagnosed
invocation failure gets one corrected retry without spending a slot. When an
allocated reviewer stays unavailable, stop at the review boundary or record
an explicit user waiver — never substitute a same-family reviewer for the
verdict.

## PR record

```markdown
## Review allocation

Scope: <ticket into staging | final work-package integration>
Tier: <0 self-review | 1 internal | 2 verdict | 3 heavy — tickets only; "n/a — final matrix" at final integration>
Trigger: <the escalation trigger that set the tier, or "none — routine">
Tier 0 basis: <qualifying category; no trigger fired; nothing downstream depends — omit above Tier 0>
Diff: <code-bearing | contract-led | routine>, authored by <fable | codex worker | mixed>
Codex: <code lens | contract lens | advisory | orchestrator review: codex-authored | both: mixed authorship | n/a: tier 0/1>
Fable /simplify: <run | n/a>
CodeRabbit: <n/a | passes>
Reason: <concrete scope and risk signals>
```

# Review

Internal lenses inform; the verdict decides; the verdict is cross-model.
Reviewer independence is a property of model family, not process boundary: a
fresh subagent of the implementing model is not trusted to judge its own
family's work, so wherever this contract allocates a verdict, it comes from a
family that did not write the diff. Simplification is not a verdict — a model
simplifies its own work well and judges it poorly.

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

## Ticket PR into staging

1. Self-review: the implementing agent reviews the whole diff for acceptance,
   accidental scope, changed contracts, generated files, secrets, and
   unrelated work, then re-verifies every acceptance criterion literally,
   item by item — intent-level rework is where named details get dropped.
2. Internal lenses: run [`code-review`](../code-review/SKILL.md) against the
   fixed integration point; keep its Standards and Spec axes separate when
   adjudicating.
3. Verdict: one Codex pass (mechanics below) with the lens matched to the
   classification. **Code lens:** wrong behavior against the accepted
   contract, missing or misleading tests, abstraction quality, and avoidable
   complexity, judged for an experimental prototype. **Contract lens:** wrong
   authority, missing decision, stale contradiction, unsafe authorization,
   dependency error, and ambiguous future action. The verdict is waived only
   when a Codex worker authored the whole diff and the orchestrator changed
   nothing beyond mechanical rebase: the orchestrator's adversarial review —
   against the accepted contract and the evidence the rail already
   authorizes, within PII boundaries — is then the cross-model verdict, and
   the PR record names its fixed head and findings-or-no-findings result.
   Any Fable-authored portion restores the Codex pass.

Complete when the internal axes and the verdict are substantive and every
finding is fixed or rationalized against the accepted ticket contract.
CodeRabbit and `/simplify` spend nothing at ticket scope; record the deferral.

## Final work-package PR

1. Internal sweep: run [`mega-review`](../mega-review/SKILL.md) once over the
   complete final-base-to-staging diff (Architecture as a diff scout; include
   Skill Quality when skill files changed). Not per ticket.
2. A routine diff is the documented exception to the verdict rule: the sweep
   and repository checks are the whole budget. Routine describes the diff,
   not the effort; any hunk touching an operating gate, boundary, or
   invariant classifies upward.
3. Otherwise run one Codex advisory and, when the diff is code-bearing, one
   Fable `/simplify` pass
   ([CLAUDE-SIMPLIFY.md](CLAUDE-SIMPLIFY.md)) in parallel against the same
   fixed head. The advisory packet includes the work-package spec and
   manifest, repository standards, changed files, commits, and exact diff
   commands — plus the authoritative ADR, policy, runbook, tracker, and
   instruction sources for contract-led work — and evaluates the problem
   globally: wrong boundaries, missing decisions, integration gaps,
   accidental complexity, and materially simpler alternatives.
4. Mark the PR ready, then run two CodeRabbit passes per
   [CODERABBIT.md](CODERABBIT.md); a third only when the second causes
   material changes or the user asks.

After accepted fixes, rerun affected checks and the gate, then only a lens
whose evidence materially changed — a new head does not restart the matrix.
At most one targeted Codex follow-up per package. Package ceilings: three
substantive Codex passes, three CodeRabbit passes, two `/simplify` runs.

## Codex mechanics

Verify once before the phase that `codex` is logged in and configured with a
GPT-family model. Write the packet to a prompt file — base and head SHAs, exact diff command, authoritative work, assigned
lens, and an instruction to separate blockers from optional improvements with
exact files and lines — then run headless with a read-only sandbox against
the frozen head:

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
Diff: <code-bearing | contract-led | routine>, authored by <fable | codex worker>
Codex: <code lens | contract lens | advisory | waived: codex-authored>
Fable /simplify: <run | n/a>
CodeRabbit: <deferred | two passes, third conditional>
Reason: <concrete scope and risk signals>
```

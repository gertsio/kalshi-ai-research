---
name: ship
description: Ship one ticket through verified integration with a review budget selected from the actual risk.
disable-model-invocation: true
---

# Ship

Ship exactly one ticket through verified integration: implement the requested
behavior, self-review it, pass the repository gate, spend the lowest sufficient
external-review budget, pass required PR checks, and merge into the ticket's
integration branch.

Do not call the ticket shipped at a local commit, an open PR, green local tests,
or a review placeholder. If the user or repository sets an earlier stopping
boundary, name the actual boundary explicitly.

## 1. Resolve the delivery contract

Before editing:

1. Resolve the authoritative ticket and its acceptance criteria.
2. Read repository instructions and discover its focused checks, full gate, PR
   requirements, and integration branch. Repository policy wins.
3. Inspect branch, worktree, and existing PR state. Preserve unrelated changes.
4. Ask one focused question only if the integration branch or a material product
   decision cannot be discovered locally—for example, whether a destructive
   migration may discard existing data.

Scope one ticket per invocation. For a ticket stack, the preceding ticket branch
may be the integration branch; ship each ticket separately.

Completion: the requested behavior, non-goals, gate, and integration branch are
known.

## 2. Implement and self-review

Implement against observable contracts. Use focused checks while working and the
full repository gate when the implementation is complete.

The implementing agent self-reviews the whole diff against the ticket,
repository standards, changed public or operational contracts, accidental
scope, generated files, secrets, and unrelated work. Fix actionable findings
and rerun affected checks. Self-review does not spawn review subagents.

Completion: the intended diff is coherent and the repository gate is green.

## 3. Select the review budget

Read [REVIEW-BUDGET.md](REVIEW-BUDGET.md). Classify the actual post-gate diff,
choose the lowest sufficient tier, select the review lens that matches the
dominant risk, and prepare the exact PR record it defines. Repository rules and
explicit user instructions are minimum floors.

Apply REVIEW-BUDGET.md's reviewer-availability branch before opening the PR, not
after the other reviews have run.

Completion: one tier, its concrete risk signals, selected lens, exact reviewers,
and reviewer availability are recorded.

## 4. Open a draft PR

Commit and push the verified diff, then open a draft PR into the resolved
integration branch. Add the review-budget record to its description. Keep the
PR draft while selected local review is running.

If the repository has no PR flow, push the gated branch, report that explicit
stopping boundary, and do not call the ticket shipped.

Completion: the remote draft contains the intended commit, correct base, and
review-budget record.

## 5. Complete local review

Run only the local reviewers selected by the budget. When Claude `/simplify` is
selected, follow [CLAUDE-SIMPLIFY.md](CLAUDE-SIMPLIFY.md). When Claude Fable
advisory review is selected, follow
[CLAUDE-FABLE-ADVISORY.md](CLAUDE-FABLE-ADVISORY.md).

The implementing agent adjudicates every result, accepts only valid changes,
and records concise rationales for rejected findings. When changes are accepted,
rerun the repository gate and push them.

Completion: every selected local reviewer produced one usable result and all
accepted changes are gated and pushed; every rejected finding has a recorded
rationale.

## 6. Make the PR reviewable

When the local portion of the budget, possibly empty, is complete, mark the PR
ready. Post this single idempotent readiness marker exactly once per ship:

`PR ready for review`

When CodeRabbit is selected, follow [CODERABBIT.md](CODERABBIT.md).

Completion: the PR is ready, the readiness comment exists once, and each selected
hosted review has been requested exactly once against the latest pushed commit.

## 7. Complete hosted review

When selected, use [CODERABBIT.md](CODERABBIT.md) to wait for CodeRabbit's final
substantive review. Adjudicate actionable findings from an unsolicited review,
but do not add that reviewer to the recorded budget or request another pass.

Fix actionable findings or record concise rationales. After fixes, use affected
checks while iterating and run the repository gate once. If no code changed, do
not rerun checks. Do not automatically request another full review.
Request at most one targeted follow-up per reviewer per ship, unless the user
directs more, and only when a fix materially changed the design, a public
contract, state or invariant handling, or the high-risk behavior under review.

If fixes introduce a new risk signal, reclassify the remaining budget upward.
When that adds a local reviewer, return the PR to draft for the pass, then mark it
ready again without duplicating the readiness comment. Never restart every
completed reviewer merely because HEAD changed.

Completion: each selected hosted reviewer produced one substantive result and
every finding is resolved or rationalized; every required targeted follow-up is
complete.

## 8. Integrate

If HEAD changed since the last green repository gate, run it again. Inspect
required PR checks on the latest head, verify the PR is mergeable and the
selected review budget is complete, then merge using repository policy. Verify
the merge landed in the correct integration branch and update repository-owned
tracker state when required.

Completion: the latest head passed the gate and required checks, the PR is merged
into the correct integration branch, and required tracker state reflects it.

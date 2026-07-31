# Final integration

Use this branch only when every required ticket and human gate for the work
package is complete.

## 1. Freeze staging

Update staging from the final base, resolve integration conflicts, run the full
repository gate, and inspect the entire final-base-to-staging diff.

Open or refresh one draft staging PR into the final base. Its description states
the objective, business value, ticket inventory, important non-goals,
verification, migration or rollback consequences, and review-allocation record
from [REVIEW.md](REVIEW.md).

Completion: one draft PR contains the complete integrated diff, no ticket is
missing, staging is based on the current final base, and the gate is green.

## 2. Complete the final review

Follow the final work-package branch in [REVIEW.md](REVIEW.md): internal sweep,
then the passes the final matrix allocates — the Codex advisory (forced when any
ticket shipped below Tier 2) and, for code-bearing diffs, the `/simplify` wave — then
the CodeRabbit passes on the ready PR with the idempotent `PR ready for review`
marker posted exactly once. Adjudicate findings centrally, apply only changes that improve
the accepted contract, and gate every changed head.

Completion: every allocated pass is usable under [REVIEW.md](REVIEW.md), all
findings are resolved or rationalized, and the latest staging head passed the
gate.

## 3. Integrate

Inspect required checks on the latest head, verify mergeability and complete
review allocation, then merge using repository policy. Verify the merge landed
in the final base, update repository-owned tracker state, and reconcile
permanent agent guidance when repository instructions require it.

Completion: the final PR is merged into the correct base, required checks and
reviews passed on the accepted head, and tracker and permanent guidance reflect
the integrated work package.

# Ticket delivery

Use this branch when a work-package ticket remains. The ticket branch starts
from the latest staging head and its PR targets staging.

## 1. Implement

Implement the observable acceptance contract. Use [`tdd`](../tdd/SKILL.md)
where possible, at pre-agreed seams. Use focused checks while working
and the full repository gate when the implementation is coherent. Include
adjacent cleanup needed to leave one clear design without importing another
ticket's product behavior.

Update repository-owned tracker state and permanent guidance when the ticket
changes their owned meaning. Remove superseded code, tests, and documentation
instead of preserving compatibility residue without an accepted need.

Completion: acceptance criteria are met, owned contracts agree, and the full
repository gate is green.

## 2. Complete ticket review

Commit the intended diff locally so every reviewer receives the same fixed base
and head. Do not push it yet. Follow the ticket branch in
[REVIEW.md](REVIEW.md): self-review, internal lenses, cross-model verdict.

After accepted changes, rerun affected checks and the full gate. Rerun only a
lens whose evidence materially changed.

Completion: the internal axes and the verdict produced usable passes under
[REVIEW.md](REVIEW.md), every finding is resolved or rationalized, and the
latest ticket head passed the gate.

## 3. Merge into staging

Push the reviewed commits and open a PR into staging. Add the review-allocation
record from [REVIEW.md](REVIEW.md). Wait for required PR checks,
resolve conflicts without widening scope, and merge using repository policy.
Verify the merge landed in staging and update tracker state when required —
one status write, using the tracker's own resolver where it has one
(`work.py set <id> completed`); never restate a frontier it derives.

Completion: the ticket PR is merged into staging, required checks passed on its
latest head, tracker state is current, and the next frontier is reported.

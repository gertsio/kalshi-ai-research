# Review budget

Classify the actual post-gate diff, not the ticket label or initial estimate.
Choose the lowest tier that covers every material risk signal. A tier's
reviewer list is closed: no reviewer runs unless the tier or the user names
it. Do not silently downgrade below objective risk; record any user-directed
downgrade.

File type is not risk. Documentation is routine only when it describes an
unchanged contract. A spec, ADR, tracker, policy, migration plan, deployment
runbook, or agent instruction that authorizes future behavior carries the risk
of that behavior even when the diff contains no executable code.

## Review lens

When the tier includes a local review, select the lens that matches the dominant
risk:

- **Simplification lens — Claude `/simplify`:** implementation structure,
  duplication, accidental complexity, or an over-broad code change. Follow
  [CLAUDE-SIMPLIFY.md](CLAUDE-SIMPLIFY.md).
- **Contract lens — Claude Fable advisory:** specs, plans, ADRs, trackers,
  policies, runbooks, instructions, or mixed diffs where the main risk is a
  wrong boundary, missing decision, unsafe authorization, stale contradiction,
  or dependency error. Follow
  [CLAUDE-FABLE-ADVISORY.md](CLAUDE-FABLE-ADVISORY.md).

At Tier 2 and above, CodeRabbit runs in addition to the selected local lens. At
Tier 1, exactly one reviewer runs. A user may name an additional reviewer, but
the PR record must distinguish required budget from the explicit addition.

## Tier 0 — routine

Use for narrow, obvious, low-consequence changes: comments, formatting,
generated metadata, mechanical renames, or descriptive documentation and
localized fixtures/configuration with no changed runtime behavior,
authoritative or operational contract, tracker state, safety policy,
persistence, deployment, or production path.

Mechanical tracker status updates that only record already-completed work stay
routine; changes that authorize, block, cancel, or re-scope future work do not.

External reviews: none.

## Tier 1 — meaningful

Use for an ordinary localized, reversible, well-covered behavior change, or a
localized reversible change to authoritative or operational meaning such as a
spec, ADR, tracker, policy, runbook, or instruction, when no Tier 2 or Tier 3
signal applies.

External reviews: exactly one of the risk-matched local lens or CodeRabbit.

Prefer CodeRabbit when independent behavior review is the main value. Prefer
the simplification lens for implementation structure and the contract lens for
authoritative planning or operational meaning.

## Tier 2 — high-risk

Use when a material part of the diff affects any of:

- lifecycle or state transitions;
- persistence, storage, schemas, migrations, or durable artifact formats;
- concurrency, locking, ordering, idempotency, or atomicity;
- authentication, authorization, security, privacy, secrets, or permissions;
- production writes, deployment, infrastructure, or external side effects;
- CI or deployment-pipeline configuration;
- a public API, CLI, protocol, compatibility contract, or cross-system boundary;
- a broad cross-module refactor or architectural seam with a non-local failure
  radius.

External reviews: exactly one risk-matched local review plus one substantive
CodeRabbit review.

## Tier 3 — critical

Use for an irreversible or destructive migration, a change guarding production
safety or sensitive or high-value data, a one-way transition without safe
rollback, or an exceptionally large architectural change with systemic blast
radius.

External reviews: Tier 2 plus exactly one specialist selected for the remaining
dominant risk: migration or storage, concurrency, security, production safety,
or architecture and maintainability. Use a named specialist skill when
installed; otherwise run one focused specialist agent with that single lens.
The specialist receives the fixed diff, the ticket, repository rules, and
exactly one remaining risk lens. Thermonuclear review is the architecture and
maintainability specialist when available. `/code-review` is appropriate only
when its Standards-and-Spec axes are the focused missing evidence.

Confirm Tier 3 with the user unless already requested. Ask when Tier 2 versus
Tier 3 is genuinely ambiguous.

## Reviewer availability

Check each selected reviewer once before opening the PR: verify the tool or app,
authentication, and target-branch eligibility. Each selected reviewer gets at
most one corrected retry after a diagnosed cause.

- Tier 1 substitutes another suitable lens or CodeRabbit when its first choice
  is unavailable, returning the PR to draft when the substitute reviews
  locally. The substitute must address the same dominant risk and be recorded
  in the PR; do not replace contract review with simplification merely because
  both use Claude. If no suitable reviewer is available, report the unmet
  budget as the stopping boundary.
- Tier 2 and Tier 3 require the selected local reviewer and CodeRabbit. After
  one corrected retry, report an unavailable required reviewer as the stopping
  boundary instead of silently switching lenses or inventing a replacement.

## PR record

```markdown
## Review budget

Tier <0-3> — <routine|meaningful|high-risk|critical>

Reason: <concrete risk signals in this diff>
Local lens: <none, simplification, or contract>
Reviewers: <none, Claude /simplify, Claude Fable advisory, CodeRabbit, or named
specialist>
```

## Completion accounting

- One usable completed pass per selected reviewer. Completion is judged by the
  reviewer's output, not the harness exit status: failed attempts without a
  usable result do not count; wrapper failures after a usable result do.

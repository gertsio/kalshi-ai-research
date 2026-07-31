# Aggregation Reference

Use this reference after all selected mega-review lenses finish.

## Preserve Axes

Keep one section per lens:

- Standards
- Spec
- Behaviour/Test Risk
- Strict Quality
- Architecture
- Skill Quality

Do not merge, rerank, or flatten the lenses into one generic list. A change can pass one axis and fail another.

## Severity

Within each lens, order findings by review impact:

1. Blocker
2. Serious concern
3. Follow-up
4. No findings

Architecture candidates are not approval blockers unless the diff itself introduced the regression. Mark discovered opportunities separately.

## Deduplication

Deduplicate only obvious duplicate findings. If two lenses report the same file for different reasons, keep both and cross-reference them briefly.

## Final Shape

End with:

- Coverage by lens or shard, including unreviewed areas.
- Finding counts by lens.
- Worst issue within each lens, if any.
- Skip reasons for lenses not run.
- Commands or checks actually run.

Findings without concrete evidence should be omitted or marked as speculative. Do not claim tests passed unless they were run. Do not hide that a lens was skipped.

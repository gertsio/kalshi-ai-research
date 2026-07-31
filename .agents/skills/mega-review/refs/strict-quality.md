# Strict Quality Reference

Use this reference for the Strict Quality lens in a mega review.

This lens is demanding but scoped: find structural maintainability problems in the reviewed diff, not every cleanup idea in the repository.

## What To Prioritize

Report high-conviction issues in this order:

1. Structural regressions that make the code harder to reason about.
2. Missed simplifications where a clearer shape would delete branches, modes, helpers, or layers.
3. Spaghetti growth: ad-hoc conditionals, scattered special cases, one-off flags, and busy functions getting busier.
4. Weak module shape: shallow modules, pass-through abstractions, or interfaces nearly as complex as their implementations.
5. Type and contract mud: unnecessary optionality, casts, loosely shaped objects, or silent fallbacks that hide invariants.
6. Logic in the wrong module, duplicated helpers, or feature-specific checks leaking into shared paths.
7. File-size and decomposition issues, especially a PR pushing a file from below 1000 lines to above 1000 lines.
8. Non-atomic updates or unnecessary sequential orchestration when a cleaner structure is obvious.

## Review Questions

Ask these for every meaningful change:

- Can the behaviour stay while fewer concepts, branches, or helper layers exist?
- Does deleting a new module concentrate complexity or just remove pass-through code?
- Is the interface smaller than the implementation it unlocks?
- Does the change improve locality for maintainers and leverage for callers/tests?
- Is the logic sitting at the seam that owns the concept?
- Is an adapter justified by real variation, or is the seam hypothetical?
- Are tests exercising the intended interface, or reaching past it?

## Output

For each finding:

- Name the structural problem.
- Cite the changed file or hunk.
- Explain the simpler shape in plain English.
- Say whether it is a blocker, serious concern, or follow-up.

Do not flood the report with cosmetic nits. If the code is basically direct and maintainable, say so.


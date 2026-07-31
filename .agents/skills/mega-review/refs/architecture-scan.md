# Architecture Scan Reference

Use this reference for Architecture lenses.

This lens finds deepening opportunities: refactors that turn shallow modules into deep modules. It is opportunity discovery, not normal PR approval, unless the diff introduced the architectural regression.

## Vocabulary

Use the codebase-design vocabulary exactly:

- **Module** - anything with an interface and implementation.
- **Interface** - everything callers must know to use the module correctly.
- **Implementation** - what sits inside the module.
- **Depth** - behaviour unlocked per unit of interface.
- **Seam** - where the interface lives.
- **Adapter** - a concrete implementation at a seam.
- **Leverage** - capability callers get from depth.
- **Locality** - change, bugs, knowledge, and verification concentrating in one place.

Do not substitute `component`, `service`, `API`, or `boundary` for these concepts.

## Required Context

Before exploring, read:

- `CONTEXT.md`
- relevant ADRs under `docs/adr/`
- domain package docstrings for the touched area, when present

The domain language names good seams. ADRs record decisions the scan should not re-litigate unless the friction is real enough to reopen the decision.

## Diff Architecture Scout

Use this mode during a mega diff review.

Look for:

- One concept requiring many module hops to understand.
- Modules whose interface nearly matches their implementation.
- Pure functions extracted only for tests while the real bugs live in orchestration.
- Coupled modules leaking across seams.
- Tests that cannot exercise behaviour through the current interface.
- Existing modules that fail the deletion test: deleting them would not concentrate complexity.

Output at most five candidates. Each candidate includes:

- Files/modules involved.
- Problem.
- Proposed deepening.
- Benefits in terms of locality, leverage, and testability.
- Recommendation strength: `Strong`, `Worth exploring`, or `Speculative`.
- Whether it is caused by this diff or only discovered while reviewing.

## Full Architecture Scan

Use this mode when the user asks for an architecture scan rather than a PR approval review.

Write a self-contained HTML report to the OS temp directory:

- Resolve temp dir from `$TMPDIR`, then `/tmp`, then `%TEMP%` on Windows.
- Name it `architecture-review-<timestamp>.html`.
- Use Tailwind via CDN for layout.
- Use Mermaid via CDN for graph-shaped diagrams.
- Use hand-built CSS/SVG for editorial before/after visuals.

Each candidate card includes:

- Files/modules.
- Problem.
- Solution.
- Benefits in terms of locality, leverage, and testability.
- Before/after diagram.
- Recommendation strength.

End with a top recommendation. Do not propose concrete interfaces yet; ask which candidate the user wants to explore.


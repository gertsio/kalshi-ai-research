# Diff Review Reference

Use this reference when the substrate is a branch, PR, work-in-progress diff, or commit range.

## Setup

Pin one base and one target for every diff lens. Prefer the user's explicit comparison. If the user named a GitHub PR and the repo is available through `gh`, fetch the PR base, head, title, body, files, commits, and linked issues with authenticated `gh` before falling back to local branch assumptions.

Capture:

- Base ref/SHA: `<base>`
- Target ref/SHA: `<target>`
- Diff command: `git diff <base>...<target>`
- Commit list: `git log <base>..<target> --oneline`
- Changed files: `git diff --name-only <base>...<target>`

For a current-branch review, `<target>` is usually `HEAD`. For an explicit `A..B` or `A...B` request, preserve the requested comparison in the shared packet and do not silently rewrite the target to `HEAD`.

Before fanout:

1. Confirm the base and target resolve with `git rev-parse`.
2. Confirm the diff is non-empty.
3. Save the exact commands in the shared packet.

Completion criterion: every diff subagent receives the same base, target, diff command, commit list, changed-file list, and PR metadata when available.

## Spec Source

Find the originating spec in this order:

1. A spec path passed by the user.
2. PR title/body, linked issues, and closing references fetched with `gh`, when reviewing a GitHub PR.
3. Issue or PR references in commit messages.
4. PRD or spec files under `docs/`, `specs/`, `.scratch/`, or `docs/work/` that match the branch, issue, or changed area.
5. If none exists, record `Spec skipped: no spec source found`.

Do not invent requirements. Spec findings must quote or cite the source requirement.

## Standards Source

Look for documented coding and repo standards, including:

- `AGENTS.md`
- `CONTEXT.md`
- `ROADMAP.md`
- `CONTRIBUTING.md`
- `CODING_STANDARDS.md`
- `docs/agents/**`
- relevant ADRs under `docs/adr/`

The Standards lens only reports violations of documented standards. It may distinguish hard violations from judgement calls, but every finding must cite the standard source.

## Lens Briefs

### Standards

Report every place the diff violates documented repo standards. Cite the standard file and rule. Skip anything tooling already enforces unless the violation creates review-relevant risk.

### Spec

Report:

- Requirements that are missing or partial.
- Behaviour the diff adds that was not requested.
- Requirements that look implemented but are likely wrong.

Each finding must quote or cite the spec line. If no spec source exists, skip this lens.

### Behaviour/Test Risk

Report likely bugs, regressions, risky edge cases, and missing behavioural tests. Prefer findings grounded in public interfaces and user-observable behaviour. Do not repeat Spec findings unless the behaviour risk is independent of the spec mismatch.

Completion criterion for every diff lens: findings are tied to concrete files, hunks, commands, specs, or standards; otherwise report no findings for that lens.

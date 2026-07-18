# Ticket 001 — Skills-hub migration and repo normalization

## Question

Bring the repo onto the standard agent conventions: agent-skills-hub-managed
skills, the local-first `docs/work/` tracker, and the compact AGENTS.md brief.

## Acceptance

- Hub default profile installed into `.agents/skills`; the three pre-existing
  repo-local skills (frontend-design, shadcn, vercel-react-best-practices)
  survive untouched with their `skills-lock.json` provenance.
- `.claude/skills` and `.pi/skills` are whole-directory symlinks to
  `.agents/skills`.
- `AGENTS.md` is the agent brief with the hub-managed block; `CLAUDE.md` is
  `@AGENTS.md`.
- `docs/agents/` carries the issue-tracker, domain, triage-labels, and
  friction-log contracts; `docs/work/` carries this spec.
- Legacy `docs/prd/` rail removed (superseded by this tracker; history in Git).

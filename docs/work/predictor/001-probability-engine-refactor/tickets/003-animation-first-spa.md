# Ticket 003 — Animation-first React SPA

## Question

Replace the Next.js app with a Vite React + Tailwind SPA whose in-flight
analysis view is the product: the screen visibly researches while the engine
streams.

## Acceptance

- Static Vite build (Cloudflare-hostable) with React, Tailwind v4, and the
  existing shadcn component style; no server runtime required.
- The analysis view consumes the SSE stream and animates: stage timeline
  advancing, sources/links appearing as found, probability estimate
  converging, memo reveal at the end.
- The finished memo keeps the current substance: market vs agent probability,
  delta, evidence with links, counterarguments, settlement risks, warnings,
  disclaimer.
- Responses render only after client-side contract validation (zod), as
  before.
- `npm run check` (typecheck, lint, format, tests) is green.

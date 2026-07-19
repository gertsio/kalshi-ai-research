# Ticket 005 — Frontend deploy on Cloudflare

## Question

Serve the built SPA from Cloudflare, pointed at the VPS backend.

## Acceptance

- Production build deployed to Cloudflare (Pages or Workers static assets).
- Frontend reads the backend base URL from build-time configuration; the
  deployed origin is in the backend's CORS allowlist alongside localhost dev.
- End-to-end: submitting a market on the deployed site streams a live
  analysis from the VPS backend, including the demo path.

## Outcome

Completed 2026-07-18: Cloudflare Pages project `probable-9mr` created and
`npm run deploy` ships `dist/` to it. Cloudflare appended a random suffix to
the subdomain, so the live origin is `https://probable-9mr-azu.pages.dev`
(not `probable-9mr.pages.dev`); the VPS CORS allowlist and preview-origin
regex were updated to match. Verified end to end: the site serves the built
SPA whose bundle points at `https://probable-api.5-161-180-27.sslip.io`, and
a CORS preflight from the deployed origin passes against the backend, which
streams both demo and live analyses.

Remaining follow-up: once the `probable-api.gerts.io` record lands, update
`.env.production` and redeploy.

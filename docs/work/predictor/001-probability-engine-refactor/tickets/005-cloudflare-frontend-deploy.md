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

Prepared 2026-07-18: `.env.production` pins `VITE_API_BASE_URL` to the sslip
backend host and `npm run deploy` builds and pushes `dist/` to Cloudflare
Pages project `probable`. The VPS engine already allowlists
`https://probable.pages.dev` for CORS.

## Remaining (human gate)

- Authenticate once: `npx wrangler login`, then run `npm run deploy`.
- If the Pages project name `probable` is taken, pick another and update the
  CORS origin in the VPS `.env` to match.
- After the backend moves to `probable-api.gerts.io`, update
  `.env.production` and redeploy.

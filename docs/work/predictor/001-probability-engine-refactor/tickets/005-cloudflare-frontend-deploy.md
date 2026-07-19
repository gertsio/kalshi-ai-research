# Ticket 005 — Frontend deploy on Cloudflare

## Question

Serve the built SPA from Cloudflare, pointed at the VPS backend.

## Acceptance

- Production build deployed to Cloudflare (Pages or Workers static assets).
- Frontend reads the backend base URL from build-time configuration; the
  deployed origin is in the backend's CORS allowlist alongside localhost dev.
- End-to-end: submitting a market on the deployed site streams a live
  analysis from the VPS backend, including the demo path.

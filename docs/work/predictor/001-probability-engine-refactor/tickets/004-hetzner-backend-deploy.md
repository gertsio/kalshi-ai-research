# Ticket 004 — Backend deploy on Hetzner VPS

## Question

Deploy the engine to the Hetzner VPS as a standard `hetzner-vps` ops-repo
project.

## Acceptance

- `projects/<project>/` package in the ops repo: CONTEXT.md, README runbook,
  `deploy.sh`, `docker-compose.yml`, `.env.example`, following the openclaw
  template (loopback-bound port, healthcheck, state under
  `/home/deploy/state/` if any).
- Public HTTPS route through Caddy on a `gerts.io` subdomain, recorded per the
  ops repo's exposure/ADR posture.
- Secrets live only in the uncommitted VPS `.env` (chmod 600).
- Health endpoint reachable from the public internet; streaming works through
  the proxy (no buffering of SSE).

## Outcome

Deployed 2026-07-18 as ops-repo project `projects/probable` (branch
`probable-project`, ADR-008): stateless engine container built on the VPS from
the app repo checkout, healthy on loopback `127.0.0.1:8100`; Caddy installed
as host ingress with routes for `probable-api.gerts.io` and
`probable-api.5-161-180-27.sslip.io` (SSE unbuffered). Engine runs without a
Gemini key (heuristic scoring) because the stored OpenRouter key returns 401.

## Remaining (human gate)

- Open TCP 80 + 443 in the Hetzner Cloud firewall (console or hcloud CLI; no
  API token available to agents). Caddy's ACME retries will then issue certs
  automatically — no further server action needed.
- Optional: add Porkbun A record `probable-api.gerts.io -> 5.161.180.27`.
- Optional: put a working `GEMINI_API_KEY` into the VPS `.env` and redeploy.
- After the integration PR merges to main, set `PROBABLE_GIT_REF=origin/main`
  in the VPS `.env` (currently pinned to the staging branch).

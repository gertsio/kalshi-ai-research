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

Completed 2026-07-18 as ops-repo project `projects/probable` (branch
`probable-project`, ADR-008): stateless engine container built on the VPS from
the app repo checkout at `origin/main`, healthy on loopback `127.0.0.1:8100`;
Caddy is host ingress with SSE unbuffered. TCP 80/443 opened in the Hetzner
Cloud firewall (`vps-fw-ash`, via hcloud), Let's Encrypt cert issued for
`https://probable-api.5-161-180-27.sslip.io`, and public health + live
analysis streams verified end to end. A working Gemini key is in the VPS
`.env`, so live runs use Gemini scoring (validated with a direct API call and
a full non-demo analysis).

Deferred until a website exists on `gerts.io`: the Porkbun A record
`probable-api.gerts.io -> 5.161.180.27`. The Caddy route is already in place;
its ACME attempts fail harmlessly until the record lands.

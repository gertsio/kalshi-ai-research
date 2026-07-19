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

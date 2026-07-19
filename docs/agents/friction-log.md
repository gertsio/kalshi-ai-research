# Friction Log

Append-only inbox of agent friction: missing context, stale or misleading
guidance, repeated rediscoveries, tooling gaps, and cheap changes that would
make agent work in this repo faster or safer. Entries are raw observations,
not tickets. The `groom-friction` skill processes this file every few days,
turning entries into fixes or tracker tickets, then deletes them — so the
append-only shape never conflicts with the rewrite-not-append discipline of
guidance docs.

## When to append

At the end of a task, add an entry if during the work you:

- lacked context that a doc, pointer, or example should have provided;
- were misled by stale or wrong guidance and had to discover the truth yourself;
- repeated a discovery another agent has likely made before;
- fought tooling: slow or flaky checks, missing scripts, confusing commands;
- see a cheap change that would make future agent runs faster or safer.

Log it and finish your task; do not fix the issue inline unless it is a
trivial pointer correction. Do not log task outcomes or decisions — those
belong to tickets and Git.

## Entry format

One line per observation, newest last:

```
- YYYY-MM-DD | <task or area> | what happened / what was missing | suggested fix (optional)
```

## Entries

<!-- append below this line -->

- 2026-07-18 | live engine verification | The stored GEMINI_API_KEY (OpenRouter sk-or-…) returns 401 on chat completions, so live runs silently need the heuristic-scoring fallback; nothing documented the key's health | keep a working estimator key in .env or note the fallback in README
- 2026-07-18 | VPS public exposure | Ports 80/443 are closed at the Hetzner Cloud firewall (not ufw), and neither hcloud nor Porkbun credentials are available to agents, so public HTTPS ends at ACME retries until the owner opens the firewall | document the cloud-firewall gate and credential boundaries in the hetzner-vps ops repo
- 2026-07-18 | Cloudflare Pages deploy | New Pages projects get a random suffix on the pages.dev subdomain (`probable-9mr` -> `probable-9mr-azu.pages.dev`), so a CORS origin pinned before the first deploy is guaranteed stale | create the Pages project and read its real domain before wiring CORS

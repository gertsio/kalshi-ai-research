# Spec 001 — Probability engine refactor and first deploy

## Intent

Turn the hackathon prototype into a deployed event-probability predictor and
explainer. A user submits an event (today: a Kalshi market ticker or URL), the
engine researches it live, and the frontend animates the analysis while it
runs: stages advancing, sources and links appearing as they are found, the
probability estimate converging, and a final memo with evidence,
counterarguments, and settlement risks.

## Outcomes

1. **Streaming engine.** The FastAPI service exposes the analysis as a stream
   of typed progress events (stage transitions, evidence found, estimate
   updates, final validated response) in addition to the final response
   contract. The event-source seam is source-agnostic: Kalshi is the first
   `EventSource` implementation, and a free-text event can become another
   implementation without touching the engine loop.
2. **Animation-first frontend.** A React + Tailwind SPA (static build,
   Cloudflare-hostable) consumes the stream and renders the live analysis.
   The finished state is the full research memo; the in-flight state is a
   first-class, designed experience rather than a spinner.
3. **Deployed backend.** The engine runs on the Hetzner VPS as a
   `hetzner-vps` ops-repo project (Docker Compose, `deploy.sh`, `.env` from
   template, Caddy route on a `gerts.io` subdomain). Public exposure is
   recorded per the ops repo's ADR posture.
4. **Deployed frontend.** The SPA is served by Cloudflare and points at the
   VPS backend; CORS allows exactly the deployed origin plus localhost dev.

## Out of scope

- Trading, order placement, portfolio features, or any advice framing.
- Event sources beyond Kalshi (the seam exists; implementations come later).
- Accounts, persistence of past analyses, multi-user features.

## Constraints

- Research-only language contract and disclaimer validation stay enforced in
  the response contract.
- Provider secrets (Gemini, Tavily) never reach the browser.

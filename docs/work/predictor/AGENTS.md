# Predictor Workstream Notes

Run policy: tickets ship one PR each unless the manifest says otherwise.

Human gates:

- Public exposure changes (new domains, Caddy routes, CORS origins) follow the
  hetzner-vps ops repo's ADR posture; confirm with the owner before widening
  access beyond what the active spec records.
- Anything that would make analysis output read as trading advice is a hard
  stop, not a judgment call.

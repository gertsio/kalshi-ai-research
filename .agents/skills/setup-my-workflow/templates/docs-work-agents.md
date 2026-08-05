# Work Docs Agent Notes

Follow `../agents/issue-tracker.md`. It is the source of truth for using the
local tracker under `docs/work/`.

This directory contains durable specs, ticket manifests, ticket files, and
workstream-scoped agent notes.

Resolve the queue with `python3 docs/work/work.py next` rather than reading
manifests by hand. Manifests store only intrinsic status and `blocked_by`;
blockedness and the frontier are derived, so never write them down.

If the target workstream, spec, or ticket is ambiguous, ask one short question.

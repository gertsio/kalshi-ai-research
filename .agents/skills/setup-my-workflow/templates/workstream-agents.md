# Workstream Agent Notes

The manifests are the only queue, sequence, and status interface; resolve them
with `python3 docs/work/work.py`. This file owns only run policy and human
gates. Do not copy frontiers, queues, or outcomes here.

## Human Gates

- <Who owns which decision or manual step, and what it unblocks.>

## Run Policy

- <How ticket work reaches the base branch: PR shape, review, staging rules.>

History belongs in ticket outcomes and git, never in manifests or this file.

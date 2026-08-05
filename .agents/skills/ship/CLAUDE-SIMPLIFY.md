# Fable 5 `/simplify`

Capability: Claude Code with model alias `fable`, CLI effort `high`, and the
`/simplify` command.

When allocated by [REVIEW.md](REVIEW.md), run one observable pass
in a temporary detached worktree at the fixed staging head. A concurrent
read-only review cannot observe or race edits in this isolated worktree.

Before running, verify `claude` is installed, `claude auth status` reports a
logged-in account, and `claude --help` advertises the `fable` model alias plus
`--effort`, `--permission-mode`, `--output-format`, and
`--no-session-persistence`.

Substitute the resolved final base, fixed staging head, and isolated worktree:

```bash
run_id="$(git rev-parse --short HEAD)-$(date +%Y%m%d%H%M%S)"
base_ref="<resolved-final-base>"
staging_head="<fixed-staging-head>"
simplify_worktree="<temporary-detached-worktree-at-staging-head>"
cd "$simplify_worktree"
claude --permission-mode acceptEdits \
  --model fable \
  --effort high \
  --verbose \
  --output-format stream-json \
  --no-session-persistence \
  --debug-file "/tmp/fable-simplify-${run_id}.debug.log" \
  -p "/simplify Review the complete integrated diff against ${base_ref} at fixed head ${staging_head}. This is an experimental prototype: remove accidental complexity, speculative edge cases, redundant validation, excessive tests, shallow abstractions, and compatibility residue while preserving accepted contracts, safety boundaries, and observable behavior. Use one bounded pass and return an explicit no-op, summary, or inspectable diff." \
  > "/tmp/fable-simplify-${run_id}.jsonl" \
  2> "/tmp/fable-simplify-${run_id}.stderr.log"
claude_exit=$?
```

Inspect the artifacts and isolated diff. Port only coherent,
behavior-preserving simplifications into staging;
leave the temporary worktree uncommitted. Rejected edits receive concise
rationales. Remove the temporary worktree only after its result and diff have
been captured.

Judge completion with the usable-pass definition and retry budget in
[REVIEW.md](REVIEW.md).

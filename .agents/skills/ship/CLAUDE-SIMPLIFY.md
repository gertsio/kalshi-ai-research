# Claude `/simplify`

Capability: Claude Code with the `/simplify` command.

Run one observable, bounded pass from the ticket worktree. Substitute the
resolved integration branch before running:

```bash
run_id="$(git rev-parse --short HEAD)-$(date +%Y%m%d%H%M%S)"
base_ref="<resolved-integration-branch>"
claude --permission-mode acceptEdits \
  --verbose \
  --output-format stream-json \
  --debug-file "/tmp/claude-simplify-${run_id}.debug.log" \
  -p "/simplify Review only this ticket's diff against ${base_ref}. Use one bounded pass and return an explicit no-op, summary, or inspectable diff." \
  > "/tmp/claude-simplify-${run_id}.jsonl" \
  2> "/tmp/claude-simplify-${run_id}.stderr.log"
claude_exit=$?
```

Claude completed when it produced any one of:

- a usable JSONL result or summary;
- an explicit no-op;
- an inspectable, coherent worktree diff plus JSONL evidence that Claude finished
  its edit phase rather than aborting mid-edit.

Completion and acceptance are separate. Inspect the artifacts and diff. Accept
only behavior-preserving simplifications and revert rejected edits. The main
skill owns the post-review gate.

A wrapper, shell assignment, logging, or post-exit failure does not invalidate
an already usable Claude result. The process exit code alone is not the
completion criterion. Rerun only when Claude itself produced no usable result;
inspect and correct the invocation, authentication, or worktree cause first.
Use the shared retry and unavailable-reviewer budget in REVIEW-BUDGET.md. Do not
rerun merely to obtain a clean wrapper exit.

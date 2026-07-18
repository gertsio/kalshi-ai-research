# Claude Fable advisory review

Capability: Claude Code with model alias `fable` at CLI effort `high`.

Before opening the PR, verify `claude` and `gh` are installed, `claude auth
status` and `gh auth status` report logged-in accounts, and `claude --help`
advertises the `fable` model alias plus `--effort`, `--output-format`, and
`--no-session-persistence`. This is a local CLI review; do not substitute a
different reviewer or tool.

Use this read-only contract review after the draft PR exists. Substitute the PR
number and make the prompt name the authoritative ticket plus every relevant
spec, ADR, policy, runbook, or instruction file:

```bash
pr_number="<draft-pr-number>"
authoritative_ticket="<ticket path or URL>"
artifacts="<comma-separated spec, ADR, policy, runbook, or instruction paths>"
result_file="/tmp/claude-fable-advisory-pr-${pr_number}.json"
claude -p \
  --model fable \
  --effort high \
  --permission-mode plan \
  --tools "Read,Grep,Glob,Bash" \
  --disallowedTools "Edit,Write,NotebookEdit,WebFetch,WebSearch" \
  --output-format json \
  --no-session-persistence \
  "Run one read-only advisory contract review for PR ${pr_number}. Use gh pr view and gh pr diff to inspect the PR. Read the repository instructions. Authoritative ticket: ${authoritative_ticket}. Design artifacts: ${artifacts}. Find wrong boundaries, missing decisions, dependency cycles, unsafe authorizations, stale contradictions, unverifiable capability claims, and wording that could cause dangerous future action. Separate blocking findings from optional improvements, cite exact files and lines, and propose concrete fixes. Do not edit, simplify, commit, push, comment, mark ready, or merge." \
  > "$result_file"
```

Use `--effort high` exactly; do not raise or lower it. The JSON result completes
the pass only when `modelUsage` identifies the Fable model family and `result`
contains a substantive findings or no-findings verdict after reading the PR. A
response that stops before reading the PR or lacks either field does not
complete the pass.

The implementing agent adjudicates every finding against the full conversation,
ticket, repository rules, and live evidence. Fable is advisory: it neither edits
the branch nor decides which suggestions land. Record accepted fixes and concise
rationales for rejected findings, rerun the gate after accepted changes, and use
the shared retry and unavailable-reviewer budget in REVIEW-BUDGET.md.

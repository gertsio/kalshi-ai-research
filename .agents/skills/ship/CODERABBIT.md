# CodeRabbit

As one-time repository setup, prefer configuration that disables automatic and
incremental reviews so `/ship` controls the allocated budget:

```yaml
reviews:
  auto_review:
    enabled: false
    auto_incremental_review: false
    drafts: false
    base_branches:
      - ".*"
```

After final Codex and Fable review is complete, the PR is ready, and the exact
`PR ready for review` marker exists, post separately:

`@coderabbitai review`

For each pass allocated by [REVIEW.md](REVIEW.md), request review
against the latest accepted head, adjudicate every finding, apply valid fixes,
and rerun affected checks plus the repository gate before pushing. Record a
reviewer's refusal to repeat a clean same-head pass rather than manufacturing a
change.

New pushes do not automatically spend or satisfy another pass. Each requested
pass may honor one explicit cooldown and retry once. If no cooldown is given,
use 30 minutes as the default bounded wait while polling reviews and comments.
After that, apply REVIEW.md's unavailable-reviewer rule rather than
waiting indefinitely.

Record which commit each pass reviewed and judge completion with the budget's
usable-pass definition.

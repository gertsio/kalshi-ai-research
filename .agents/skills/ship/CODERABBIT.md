# CodeRabbit

As one-time repository setup, prefer configuration that disables automatic and
incremental reviews so `/ship` controls the review budget:

```yaml
reviews:
  auto_review:
    enabled: false
    auto_incremental_review: false
    drafts: false
    base_branches:
      - ".*"
```

After the PR is ready and the exact `PR ready for review` marker exists, post
separately:

`@coderabbitai review`

One substantive final review or substantive no-findings response completes the
pass. A rate-limit message, disabled-branch notice, placeholder success, green
check without a review body, or silence does not.

Honor one explicit cooldown and retry the same request once. If no cooldown is
given, use 30 minutes as the default bounded wait while polling the PR's reviews
and comments. Then apply REVIEW-BUDGET.md's unavailable-reviewer branch rather
than waiting indefinitely.

New pushes do not trigger another review. A follow-up permitted by the main
skill's hosted-review rule uses `@coderabbitai review` again.

# Skill Quality Reference

Use this reference when reviewing skills or when a mega review includes changed skill files.

The goal is predictable agent behaviour: the same process on each run, not the same output.

Before judging skill-writing concepts, read the canonical standard:

- `.agents/skills/writing-great-skills/SKILL.md`
- `.agents/skills/writing-great-skills/GLOSSARY.md`

This file only scopes how the Mega Review Skill Quality lens uses that standard. Do not treat the summaries below as a replacement source of truth.

## Scope

Review files such as:

- `.agents/skills/**`
- `.codex/**/skills/**`
- plugin skill packages
- disclosed reference files linked from a skill

If a skill references a local disclosed file, read the referenced file before judging the branch that uses it.

## Review Dimensions

### Invocation

Using the canonical standard, check whether the skill should be model-invoked or user-invoked:

- Use model-invoked when the agent must reach it autonomously or another skill must reach it.
- Use user-invoked when only the human should choose it.
- If user-invoked skills are multiplying, consider a router skill.

For model-invoked skills, the description should front-load the leading word and list distinct trigger branches without synonym padding.

### Information Hierarchy

Using the canonical standard, check whether the top-level `SKILL.md` contains the steps every run needs and branch-specific reference sits behind context pointers in disclosed files.

Check for:

- Completion criteria that are checkable and demanding.
- Branches whose instructions belong behind a pointer.
- Reference that is hidden even though every path needs it.
- Co-location: a concept's rule, caveat, and output contract should be near each other.

### Failure Modes

Using the canonical standard, look for:

- **Premature completion** - fuzzy completion criteria let the agent rush to later steps.
- **Duplication** - one meaning has multiple sources of truth.
- **Sediment** - stale rules no longer relevant to the skill.
- **Sprawl** - the skill is too long for the path it supports.
- **No-op** - an instruction does not change model behaviour versus the default.

### Leading Words

Prefer compact leading words already in the model's priors when they sharpen behaviour. Do not coin jargon when ordinary words do the job.

## Output

Report:

- Invocation recommendation.
- Main predictability risks.
- Context-load and cognitive-load tradeoff.
- Completion-criterion issues.
- Concrete edits that would improve the skill.

Do not rewrite the entire skill unless asked. Keep findings tied to the file and branch they affect.

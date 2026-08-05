# Phase boundaries

A **phase** is a chunk of work inside a task — the grilling, the implementation, the QA. The definition is fuzzy on purpose: a phase ends when you think *"ok, we're done with that"*.

The **phase boundary** is the gap between two phases, and it is the only place this decision belongs. Mid-phase there is no decision to make — continue, or split the work that's left into subagents. Summarizing mid-phase makes the agent lose the thread.

## The five options

| Option       | What it does                                                    |
| ------------ | --------------------------------------------------------------- |
| **Continue** | Stay in the task. No context switch at all.                       |
| **Start fresh** | Open a new task or clear the current context and start from nothing. |
| **`/handoff`** | Write a portable markdown file and seed a task anywhere with it. |
| **Subagent** | Send the work to its own context window and get a report back.     |
| **Summarized continuation** | Compact this task, or seed a new one with its summary. |

## The tree

Work top to bottom at the boundary. The first **yes** wins.

**1. Can you continue in this task?** Two things make the answer yes: the next phase needs this phase as a **primary source**, or you have enough [smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone) left for the next phase to fit reliably. Grilling → implementation is the standard yes: the implementation wants the reasoning verbatim, not a summary of it. Continue costs nothing and loses nothing, so rule it out before anything else.

**2. Is the context irrelevant to what comes next?** Is everything in this task — the exploration, the decisions, the dead ends — disposable? If so, **start fresh** using the harness's new-task or clear-context control. It is the cheapest move on the board: it takes no time and hands back the whole window. The old task remains available as history.

The cost of getting this wrong is one-way. Clear a *relevant* context and you lose the **why** behind what you built, and no amount of reading the diff back gets it returned.

**3. Do you need to hand off?** `/handoff` is narrow. You need it only when you are:

- swapping to a **new harness** (Claude → Codex),
- moving to a **new directory** or repo,
- sending the work to a **colleague**,
- or forking a side task you found **mid-phase** without derailing what you're doing.

That list is the whole clause. What `/handoff` buys is **portability** — a file that travels. If nothing is travelling, you don't need it.

**4. Can the task be done AFK?** Is it scoped tightly enough to run with you away from the keyboard, no steering? Then send it to a **subagent** and leave this task untouched. Automated review is the standard case: the agent reads the diff and reports, and you aren't needed while it does.

**5. Otherwise, use a summarized continuation.** Relevant context, same harness, same directory, and you need to stay in the loop — this is where the tree lands, and it lands here often. Use the harness's compact or summarized-continuation control, and tell it what the next phase needs. If the harness has no such control, use `/handoff` as the portable fallback.

Summarized continuation is the **default, not the first reach**. It sits at the bottom because the four questions above it are all cheaper or more precise. The failure mode when people start here is a fresh task that is confidently wrong about a decision the summary flattened.

## Primary and secondary sources

Every move except **Continue** turns a **primary source** into a **secondary source** — the task as it happened, replaced by a summary of it. The trade is always the same shape:

| Source                            | Information | Noise | Room to move |
| --------------------------------- | ----------- | ----- | ------------ |
| Primary (Continue)                | Full        | Lots  | Little       |
| Secondary (summary, `/handoff`)    | Lossy       | Less  | Lots         |

This is why question 1 comes first. You only pay the lossiness when staying costs more than it saves.

## These are judgement calls

The questions are not objective — each has taste in it, and the same boundary can go two ways on two days. The value is in asking them **in order**, at the boundary rather than in the middle of the work.

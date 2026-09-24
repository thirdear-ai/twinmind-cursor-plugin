---
name: meeting-context
description: Retrieve decisions, requirements, and action items from the user's past meetings using TwinMind. Use when the user refers to something discussed in a meeting, standup, review, or call, mentions what was "decided" or "agreed", asks what they committed to, or asks for context behind a requirement or ticket that is not in the codebase.
---

# Meeting context from TwinMind

Code review comments, product requirements, and architectural decisions often
originate in a meeting rather than in the repository. This skill retrieves that
context so the agent works from what was actually agreed.

## When to use

- The user references a past conversation: "what did we decide about the auth flow", "as discussed in the design review"
- The user asks about their own commitments: "what did I say I would ship this week"
- A requirement or ticket lacks written context and the origin was a meeting
- The user asks for a recap before starting work on a feature

## When not to use

- The answer is in the codebase, README, or the current conversation
- The user is asking a general programming question with no organizational context

## How to use

1. Start with `summary_search` for meeting-level context. Search on the topic or
   project name rather than on meeting titles, since titles are often generic.
2. Use `todo_search` when the user asks about commitments, follow-ups, or
   action items.
3. Use `search` for a broad pass across meeting content when the summary search
   is too narrow.
4. Use `fetch` to pull the full record once a relevant result is identified.
   Do not rely on snippets alone for anything that will drive a code change.

## Working with the results

- Attribute decisions to the meeting they came from, including the date, so the
  user can tell current decisions from superseded ones.
- When two meetings conflict, surface both and prefer the more recent one,
  saying so explicitly rather than silently picking.
- If nothing relevant comes back, say so and proceed from the codebase. Do not
  infer a decision that was not found.
- Meeting content is personal data. Use it to answer the question at hand and do
  not paste unrelated transcript material into files or commit messages.

## Authentication

TwinMind tools require the user to be signed in via OAuth when the plugin is
installed. If a tool call returns an authentication error, tell the user to
reconnect the TwinMind server from Cursor's Customize panel rather than
retrying.

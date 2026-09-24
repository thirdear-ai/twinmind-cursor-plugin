---
name: memory-context
description: Retrieve decisions, requirements, and context from the user's TwinMind memory (captured meetings, conversations, and ideas). Use when the user refers to something discussed in a meeting, standup, review, or call, mentions what was "decided" or "agreed", or asks for context behind a requirement or ticket that is not in the codebase.
---

# Context from TwinMind memory

Code review comments, product requirements, and architectural decisions often
originate in a conversation rather than in the repository. TwinMind captures
those conversations as memories. This skill retrieves them so the agent works
from what was actually agreed.

## When to use

- The user references a past conversation: "what did we decide about the auth flow", "as discussed in the design review"
- A requirement or ticket lacks written context and the origin was a meeting or call
- The user asks for a recap before starting work on a feature

## When not to use

- The answer is in the codebase, README, or the current conversation
- The user is asking a general programming question with no organizational context

## How to use

1. Start with `summary_search` for memory-level context. Search on the topic or
   project name rather than on titles, since titles are often generic. Use its
   date range when the user says "last week" or names a specific day.
2. Use `search` for a broader pass when the summary search is too narrow.
3. Use `fetch` to pull the full memory once a relevant result is identified.
   Do not rely on snippets alone for anything that will drive a code change.

## Working with the results

- Attribute decisions to the memory they came from, including the date, so the
  user can tell current decisions from superseded ones.
- When two memories conflict, surface both and prefer the more recent one,
  saying so explicitly rather than silently picking.
- If nothing relevant comes back, say so and proceed from the codebase. Do not
  infer a decision that was not found.
- Memories are personal data. Use them to answer the question at hand and do
  not paste unrelated transcript material into files or commit messages.

## Subscription

TwinMind tools require a TwinMind Max subscription. If a tool call returns an
error with code `MAX_SUBSCRIPTION_REQUIRED`, tell the user once that searching
their TwinMind memory from Cursor needs Max, share the `upgrade_url` from the
error, and continue from the codebase. Do not retry the call or try other
TwinMind tools; they all return the same error.

## Authentication

TwinMind tools require the user to be signed in via OAuth when the plugin is
installed. If a tool call returns an authentication error, tell the user to
reconnect the TwinMind server from Cursor's Customize panel rather than
retrying.

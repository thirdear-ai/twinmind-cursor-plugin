# TwinMind plugin for Cursor

Bring your TwinMind memory into Cursor. Ask about decisions, requirements, and
context from your meetings and conversations without leaving your editor.

TwinMind is your private memory: it captures, transcribes, and summarizes your
meetings, conversations, and ideas. This plugin connects Cursor to the TwinMind
MCP server so that context travels with you into the code.

## Install

1. Open Cursor and go to the Plugins marketplace.
2. Search for **TwinMind**.
3. Install, then complete the sign-in prompt when Cursor asks.

You need a TwinMind account. Sign up at [twinmind.com](https://twinmind.com).

## What you can ask

- "What did we decide about the auth refactor in last week's design review?"
- "What was the reasoning behind switching to Postgres?"
- "Pull the requirements we discussed for the onboarding flow."
- "Summarize everything said about the rate limiting issue."

## What's included

### MCP server

Remote server at `https://api.twinmind.com/mcp`, authenticated with OAuth 2.0.
No local process, no API keys to paste.

| Tool | Description |
| --- | --- |
| `search` | Broad search across your memories |
| `summary_search` | Search memory summaries for topics, decisions, and outcomes, with optional date range |
| `fetch` | Retrieve the full memory, including transcript, for a result |

The server is currently read-only. It does not create, edit, or delete anything
in your TwinMind account.

### Skill

`memory-context` tells the agent when to reach for your TwinMind memory and how
to attribute what it finds, so it pulls context when it is genuinely relevant rather
than on every prompt.

## Authentication

Sign-in uses OAuth 2.0 with PKCE. Cursor opens a browser window on first use;
TwinMind never receives your Cursor credentials and this plugin stores no
secrets. If tool calls start returning authentication errors, reconnect the
TwinMind server from **Customize → MCP** in Cursor.

## Privacy

The plugin accesses only the memories in your own TwinMind account, and only
when the agent calls a tool in response to your request. See the
[TwinMind privacy policy](https://twinmind.com/legal/privacy-policy).

## Development

Validate manifests before opening a pull request:

```bash
node scripts/validate-template.mjs
```

To test locally, clone this repository into Cursor's local plugins folder.
Cursor rejects symlinks whose target is outside `~/.cursor/plugins/local`.

```bash
git clone https://github.com/twinmindai/twinmind-cursor-plugin.git ~/.cursor/plugins/local/twinmind
```

Then restart Cursor and confirm the TwinMind tools appear under **Customize → MCP**.

## Support

Email [support@twinmind.com](mailto:support@twinmind.com) or visit
[twinmind.com](https://twinmind.com).

## License

MIT. See [LICENSE](LICENSE).

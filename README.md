<p align="center">
  <img src="assets/logo.svg" alt="TwinMind" width="96" height="96">
</p>

<h1 align="center">TwinMind for Cursor</h1>

<p align="center">
  Your private memory, inside your editor.
</p>

TwinMind captures, transcribes, and summarizes your meetings, conversations,
and ideas. This plugin connects Cursor to your TwinMind memory, so the agent
can work from what was actually decided instead of guessing.

## What you can ask

- "What did we decide about the auth refactor in last week's design review?"
- "What was the reasoning behind switching to Postgres?"
- "Pull the requirements we discussed for the onboarding flow."
- "Summarize everything said about the rate limiting issue."

## Get started

1. **Get TwinMind** and capture a few conversations. See the download links below.
2. In Cursor, open the Plugins marketplace, search for **TwinMind**, and install.
3. Sign in when Cursor prompts you. A browser window opens once; there are no API keys to paste.

### Get TwinMind

| Platform | Download |
| --- | --- |
| iPhone and iPad | [App Store](https://apps.apple.com/app/apple-store/id6504585781?ct=cursor-plugin&mt=8) |
| Android | [Google Play](https://play.google.com/store/apps/details?id=ai.twinmind.android&referrer=utm_source%3Dcursor-plugin%26utm_medium%3Dreadme%26utm_campaign%3Dcursor-marketplace) |
| Mac and Windows | [Desktop app](https://twinmind.com/download?utm_source=cursor-plugin&utm_medium=readme&utm_campaign=cursor-marketplace&utm_content=desktop) |

New to TwinMind? Learn more at [twinmind.com](https://twinmind.com/?utm_source=cursor-plugin&utm_medium=readme&utm_campaign=cursor-marketplace&utm_content=learn-more).

## What's included

### MCP server

A remote server at `https://api.twinmind.com/mcp`. Nothing runs locally.

| Tool | What it does |
| --- | --- |
| `search` | Broad search across your memories |
| `summary_search` | Search memory summaries for topics, decisions, and outcomes, with an optional date range |
| `fetch` | Retrieve a full memory, including its transcript |

The server is read-only. It never creates, edits, or deletes anything in your
TwinMind account.

### Skill

`memory-context` tells the agent when your memory is worth checking and how to
cite what it finds, with the date of each decision, so it reaches for context
when it is relevant rather than on every prompt.

## Privacy and security

- The plugin reads only the memories in your own TwinMind account, and only
  when the agent calls a tool in response to your request.
- Sign-in uses OAuth 2.0 with PKCE. TwinMind never sees your Cursor
  credentials, and the plugin stores no secrets.
- Read the [TwinMind privacy policy](https://twinmind.com/legal/privacy-policy?utm_source=cursor-plugin&utm_medium=readme&utm_campaign=cursor-marketplace&utm_content=privacy).

## Troubleshooting

**Tools return authentication errors.** Reconnect the TwinMind server from
**Customize → MCP** in Cursor.

**Nothing relevant comes back.** TwinMind can only search what it has captured.
Check that the conversation was recorded in one of the TwinMind apps above.

## Development

Validate the manifests before opening a pull request:

```bash
node scripts/validate-template.mjs
```

To test locally, clone this repository into Cursor's local plugins folder.
Cursor rejects symlinks whose target is outside `~/.cursor/plugins/local`.

```bash
git clone https://github.com/twinmindai/twinmind-cursor-plugin.git ~/.cursor/plugins/local/twinmind
```

Then reload Cursor and confirm the TwinMind tools appear under **Customize → MCP**.

A daily workflow compares the live MCP server against `mcp-snapshot.json` and
opens an issue when they differ, so this README and the skill stay accurate.

## Support

Email [support@twinmind.com](mailto:support@twinmind.com).

## License

MIT. See [LICENSE](LICENSE).

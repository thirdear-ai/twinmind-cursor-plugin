The live MCP server at `api.twinmind.com/mcp` no longer matches `mcp-snapshot.json`.
The snapshot diff shows what changed. Before merging the PR:

- [ ] `README.md`: tool table, authentication section
- [ ] `skills/memory-context/SKILL.md`: tool names and when to use each
- [ ] `mcp.json`: server URL, if it moved
- [ ] Bump `version` in `.cursor-plugin/plugin.json` and add a `CHANGELOG.md` entry
- [ ] `node scripts/validate-template.mjs` passes
- [ ] Reinstall locally in Cursor and confirm the tools load and sign-in works

Cursor re-reviews every update to a Marketplace plugin, so ship doc changes in one PR.
If the change is intentional and needs no doc update, merge as is to record the new baseline.

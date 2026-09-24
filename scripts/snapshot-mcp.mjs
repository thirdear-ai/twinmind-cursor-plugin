#!/usr/bin/env node
// Snapshots the public surface of the TwinMind MCP server that this plugin
// documents (tool list and OAuth discovery). The scheduled mcp-drift workflow
// regenerates mcp-snapshot.json and opens a PR when it changes, so README.md
// and the meeting-context skill stay in sync with the server.
//
//   node scripts/snapshot-mcp.mjs          # rewrite mcp-snapshot.json
//   node scripts/snapshot-mcp.mjs --check  # exit 1 if the live server differs

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapshotPath = path.join(repoRoot, "mcp-snapshot.json");
const apiBase = process.env.TWINMIND_API_BASE ?? "https://api.twinmind.com";

const sources = {
  tools: `${apiBase}/mcp/v1/tools`,
  protectedResource: `${apiBase}/.well-known/oauth-protected-resource`,
  authorizationServer: `${apiBase}/.well-known/oauth-authorization-server`,
};

async function getJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) {
    throw new Error(`GET ${url} returned HTTP ${response.status}`);
  }
  return response.json();
}

/**
 * Reduce the live responses to the fields this plugin depends on.
 * Everything returned here is diffed; everything left out is ignored.
 *
 * @param {{ tools: { tools: object[] }, protectedResource: object, authorizationServer: object }} live
 * @returns {object} JSON-serializable snapshot
 */
function snapshotOf({ tools, protectedResource, authorizationServer }) {
  const pick = (source, keys) => Object.fromEntries(keys.map((key) => [key, source[key] ?? null]));
  return {
    // Names, wording, and parameters: what README.md and the skill describe.
    tools: tools.tools
      .map((tool) => ({
        name: tool.name,
        title: tool.title ?? null,
        description: tool.description ?? null,
        parameters: Object.keys(tool.inputSchema?.properties ?? {}).sort(),
        required: [...(tool.inputSchema?.required ?? [])].sort(),
        annotations: tool.annotations ?? null,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    // Only the OAuth fields whose change would break sign-in for installed users.
    protectedResource: pick(protectedResource, ["resource", "authorization_servers", "scopes_supported"]),
    authorizationServer: pick(authorizationServer, [
      "issuer",
      "authorization_endpoint",
      "token_endpoint",
      "registration_endpoint",
      "scopes_supported",
      "grant_types_supported",
      "code_challenge_methods_supported",
      "token_endpoint_auth_methods_supported",
    ]),
  };
}

// Stable key order so the committed file only changes when content does.
function sortKeys(value) {
  if (Array.isArray(value)) {
    return value.map(sortKeys);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, sortKeys(value[key])])
    );
  }
  return value;
}

async function main() {
  const live = Object.fromEntries(
    await Promise.all(Object.entries(sources).map(async ([key, url]) => [key, await getJson(url)]))
  );
  const next = `${JSON.stringify(sortKeys(snapshotOf(live)), null, 2)}\n`;

  if (process.argv.includes("--check")) {
    const current = await fs.readFile(snapshotPath, "utf8").catch(() => "");
    if (current !== next) {
      console.error("MCP server differs from mcp-snapshot.json. Run: node scripts/snapshot-mcp.mjs");
      process.exit(1);
    }
    console.log("mcp-snapshot.json matches the live server.");
    return;
  }

  await fs.writeFile(snapshotPath, next);
  console.log(`Wrote ${path.relative(repoRoot, snapshotPath)}`);
}

await main();

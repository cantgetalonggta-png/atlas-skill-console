# Archivist batch 3

Date: 2026-11-03
Mode: clinical, sourced, stop when the tranche repeats.
Scope: server routes, Grok plugin contract, Vercel 403, ClawHub vs Grok marketplace, community grok-cli vs xAI Grok Build.

## Claims

1. TanStack Start HTTP is `createFileRoute` + `server.handlers`, returning `Response` or `Response.json`.
   Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes
   Use: Atlas routes `/health`, `/api/skills`, `/api/plugins`, `/api/session`, `/api/archivist`.

2. A Grok plugin directory may contain `skills/`, `commands/`, `agents/`, `hooks/hooks.json`, `.mcp.json`, `.lsp.json`.
   Catalog file is `.grok-plugin/marketplace.json`. Remote `source.url` should pin `sha`.
   Source: https://cdn.jsdelivr.net/gh/xai-org/plugin-marketplace@main/README.md

3. Load paths: `./.grok/plugins`, `~/.grok/plugins`, marketplace installs, `[plugins]` paths, `--plugin-dir`.
   Claude Code plugins and `AGENTS.md` are read with no extra setup.
   `/marketplace` stays empty until `[[marketplace.sources]]` exists.
   Source: https://metagrok.io/how-to/use-skills-and-plugins-in-grok-build

4. Vercel project create needs Owner, Member, or Create Project permission. 403 is a role failure.
   Deployment Protection also 403s agents unless `x-vercel-protection-bypass` is set.
   Source: https://vercel.com/docs/projects/managing-projects
   Source: https://vercel.com/docs/deployment-protection/automated-agent-access
   Decision: do not retry `create_project`. Reuse an existing project, or publish this app.

5. ClawHub (openclaw/clawhub) is OpenClaw's registry: versioned `SKILL.md`, vector search, pinable installs.
   It is not a Grok marketplace.
   Source: https://github.com/openclaw/clawhub

6. superagent-ai/grok-cli is community Bun + OpenTUI. Sub-agents default on. Telegram `/pair`. macOS computer sub-agent via agent-desktop. Not affiliated with xAI.
   Source: https://github.com/superagent-ai/grok-cli

7. xAI Grok Build is a Rust runtime: TUI, `grok -p` headless, ACP, shared skills/plugins/hooks/MCP.
   Source: https://oss-tanbou.dev/en/oss/xai-org-grok-build

## Non-claims

- No new marketplace was published.
- No ClawHub package was installed into Grok.
- The 50 live skills are the installed name list plus a purpose line written in this cycle. The 295-count inventory is unchanged.

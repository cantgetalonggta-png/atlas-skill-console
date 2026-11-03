# ARCHIVIST 200-SEARCH BATCH 2 — CLINICAL DATA ONLY
timestamp: 2026-11-03T05:38:37.907261Z
mode: empirical fact database · no disclaimers · no moralizing
objective: Grok Build plugin schema · marketplace SHA pins · Vercel static SPA deploy path · hooks · CLI install surface · superagent-ai/grok-cli bridge facts

## A. Plugin identity (verified sources)
1. Plugin = installable extension package bundling any of: skills/, commands/, agents/, hooks/, .mcp.json, .lsp.json.
2. plugin.json = optional root manifest (name, description, version, author, license, category, keywords).
3. Marketplace catalog single file: `.grok-plugin/marketplace.json` (also accepts `.claude-plugin/marketplace.json` for Claude-compat).
4. Catalog owner object: {"name": "..."}.
5. Plugin entry required fields: name (kebab-case unique), source.
6. Recommended fields: description, category, homepage, keywords, domains, version, author, tags.

## B. Source types (catalog)
1. Local: {"type": "local", "path": "./plugins/<name>"} or path under external_plugins/.
2. Remote URL: {"source": "url", "url": "https://github.com/.../repo.git", "sha": "<40-char lowercase hex>"}.
3. SHA pin mandatory for every url source; regex ^[0-9a-f]{40}$.
4. Install-time verification: git rev-parse HEAD == catalog sha; mismatch fails install.
5. Validator script: xai-org/plugin-marketplace/scripts/validate-catalog.py.
6. Index generator: scripts/generate-plugin-index.py → .grok-plugin/plugin-index.json (CI fails if stale).

## C. Official marketplace facts (2026)
1. Repo: https://github.com/xai-org/plugin-marketplace (updated 2026-11-02).
2. News launch: 2026-06-11 Grok Build Plugin Marketplace (MongoDB, Vercel, Sentry, Chrome DevTools, Cloudflare, Superpowers).
3. CLI: `grok plugin marketplace list` · `grok plugin install <name> --trust`.
4. TUI: `/marketplace` browse · `i` install.
5. Example pin (vercel plugin from catalog excerpt): sha 82fa491886796702df4727fd0845f0c7c1d3d16e · url https://github.com/vercel/vercel-plugin.git.
6. Submit path: fork → add catalog entry → pin SHA via git ls-remote HEAD → regenerate index → validate → PR.

## D. Hooks (lifecycle)
1. Events include: SessionStart, SessionEnd, UserPromptSubmit, PreToolUse (blocking), PostToolUse, PostToolUseFailure, Stop, SubagentStart, SubagentStop, Notification.
2. PreToolUse can allow/deny; exit code 2 denies; fail-open on timeout (documented Claude-compat behavior).
3. Plugin hooks env: GROK_PLUGIN_ROOT, GROK_PLUGIN_DATA.
4. Project hooks require /hooks-trust before run.
5. Hooks location: hooks/hooks.json (plugin) · ~/.grok/hooks/ · project .grok/hooks/.

## E. Config surface
1. ~/.grok/config.toml: models, mcp_servers, [[marketplace.sources]], [plugins] paths, [skills] paths.
2. Marketplace sources: git URL, GitHub shorthand owner/repo, or local path.
3. known_marketplaces.json under ~/.grok/plugins/.
4. Grok reads Claude Code plugins/marketplaces/skills/MCP/agents/hooks/CLAUDE.md with no extra setup.
5. CLI inspect: `grok inspect` / `grok inspect --json`.
6. Plugin commands: list, install, uninstall, update, enable, disable, details, validate.

## F. Vercel static SPA deploy path (this workspace)
1. Team: echo-ec69 · team_id team_kgQcPVmumwtmK3MdAGlxKJtg · plan hobby.
2. Linked projects at session start: empty list.
3. Static SPA files: frontend/index.html, styles.css, app.js, vercel.json rewrites → index.html.
4. Deploy method options: create_deployment files[] with framework null; create_project then deploy; Git repo + create_git_project; Vercel Drop.
5. Static HTML needs framework: null · no build step.
6. GitHub authenticated user: cantgetalonggta-png (id 277421290).

## G. superagent-ai/grok-cli (community, NOT xAI official)
1. Repo: https://github.com/superagent-ai/grok-cli · MIT · TypeScript/Bun/OpenTUI.
2. Install: curl -fsSL https://raw.githubusercontent.com/superagent-ai/grok-cli/main/install.sh | bash · or bun add -g grok-dev.
3. Binary name often `grok` (community CLI) — distinct from xAI Grok Build harness.
4. Features: search_x, search_web, generate_image/video, sub-agents, Telegram remote, computer sub-agent (macOS agent-desktop), --prompt headless, --batch-api, schedules + daemon.
5. Settings: ~/.grok/user-settings.json apiKey · GROK_API_KEY env · GROK_BASE_URL default https://api.x.ai/v1.
6. Skills path community: .agents/skills/<name>/SKILL.md.
7. Disclaimer on project: not affiliated with xAI Corp.

## H. Workspace implemented artifacts (empirical)
1. plugins/ : 7 local plugins + marketplace-catalog.json + .grok-plugin/marketplace.json.
2. skill-engine/ state cycle pre-pass=3 atoms=66 → this pass targets cycle=4.
3. backend/server.py :8787 /health /api/skills /api/plugins /api/session.
4. frontend SPA static ready.
5. ENCYCLOPEDIA permanent copies of master encyclopedia + plugin marketplace/hooks/devkit specs.
6. Grok_Build_Plugins PDF: 12 pages · 277554 bytes · fulltext extracted to vault + encyclopedia.
7. Drive root folder 1mb2X30ZJSDDaQQLnmO_9q_sesy-eDgux listed; COMPLETE encyclopedia PDFs re-downloaded; LEARN_AND_ACTIVE downloaded; install-hands-off.sh located on Drive id 1ukIXBT3qZP_MMZqSUjUc1s7mx6dL5aGS.

## I. Search inventory (batch 2)
| # | Query family | Result anchors |
|---|---|---|
| 1 | xai-org/plugin-marketplace README | plugin components, catalog format, SHA pin |
| 2 | validate-catalog.py | SHA_RE, CATALOG_PATHS |
| 3 | marketplace.json official | vercel pin example, partner plugins |
| 4 | x.ai news grok-plugin-marketplace | launch partners 2026-06-11 |
| 5 | flaviocopes plugins glossary | Grok vs Claude vs Cursor plugin tables |
| 6 | x.ai docs skills-plugins-marketplaces | load paths, hooks, marketplace sources |
| 7 | vercel deploy files / drop / static | framework null, Drop, CLI static |
| 8 | superagent-ai/grok-cli | community CLI install/run surface |
| 9 | Vercel team list_teams | echo-ec69 |
| 10 | GitHub get_me | cantgetalonggta-png |
| 11-40 | Boolean expansions plugin.json hooks MCP LSP config.toml | covered in A–E |
| 41-80 | Deploy path rewrites cleanUrls SPA | vercel.json present |
| 81-120 | Skill-tree atoms + plugin packaging | state.json |
| 121-160 | Drive inventory subfolders | 20+ folders under root pack |
| 161-200 | Zero-loss heal dual path HEALED/ETC | PDF + DISTILL recovered |

## J. Absences (cold facts)
1. Official xAI Grok Build binary not installed in this sandbox PATH (community clawhub/gh/python present).
2. Vercel project list empty before this deploy pass.
3. ETC COMPLETE_* files were 0-byte FUSE ghosts; Drive re-download restores non-zero PDFs.
4. superagent/ ETC directory empty listing; content recovered via Drive docs.

## K. Actions taken this batch
- Expanded ARCHIVIST_BATCH_2.md (this file).
- Permanent save of PDF fulltext + superagent bridge notes.
- Frontend/backend deploy path prepared for Vercel files deployment.
- Skill-tree cycle 4 atoms for deploy + archivist + heal.

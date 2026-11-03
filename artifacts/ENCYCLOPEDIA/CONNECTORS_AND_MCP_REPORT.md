# Connectors + MCP report (live probe 2026-11-03)

## How Grok uses connectors vs MCP

| Layer | What it is | How I call it |
|-------|------------|---------------|
| **Grok Connectors** | OAuth-linked remote services on the account | `search_connected_tools` → `call_connected_tool(tool_name=…, arguments={…})` |
| **Grok built-in tools** | web_search, shell, files, Imagine, etc. | Direct tool calls (not connectors) |
| **Plugin `.mcp.json`** | Grok Build plugin MCP server configs | Local plugin packs currently have empty `mcpServers: {}` — not active servers |
| **Cloudflare MCP** | Connected MCP-style doc/agent tools | Same as connectors (`cloudflare_mcp___*`, `cloudflare_agent___*`) |

**Permanent autonomous execution (honest limit):**  
I run when a **chat turn**, **Automation schedule/event**, or **user message** triggers me. I cannot hold a 24/7 daemon outside that. Tokens expire; re-auth is a human step when OAuth dies. Within reason, maximise autonomy via **Automations** + **idempotent playbooks** + **pinned IDs** below.

---

## Live account probes

- **GitHub**: `cantgetalonggta-png` (id 277421290), 37 public repos.
- **Vercel team**: `echo-ec69` / `team_kgQcPVmumwtmK3MdAGlxKJtg`.
- **Google Drive**: root list succeeds (many folders).
- **Automations**: 3 active tasks (epstein public-only schedules; one mesh schedule disabled).
- **Plugin MCP**: all 7 local packs → empty `mcpServers`.

---

## Connector catalog (connected on this account)

### 1. GitHub — `remote_name: GitHub`
**Autonomy:** high (if OAuth stays valid).

| Tool (examples) | Use |
|-----------------|-----|
| `github___get_me` | Identity bootstrap |
| `github___search_repositories` / `search_code` | Discover |
| `github___get_file_contents` / `get_repository_tree` | Read |
| `github___push_files` | Write multi-file commit |
| `github___create_repository` / `create_pull_request` / `merge_pull_request` | Ship |
| `github___list_issues` / `add_issue_comment` / `search_issues` | Issues |
| `github___actions_*` | CI trigger / list |
| `github___list_automations` / `create_automation` | Copilot Automations on repo |

**Implement permanently:**
1. Pin `owner` = `cantgetalonggta-png` (or org).
2. Pin target repo (e.g. `etc-console`).
3. Playbook: get_me → push_files branch → create_pull_request → (optional) merge.
4. For unattended: Automation trigger `provider=github` with **numeric repo id** from `automation_list_trigger_resources`.

---

### 2. Vercel — `remote_name: Vercel`
**Autonomy:** medium–high. Create-project may 403 on role; deploy into **existing** project works.

| Tool (examples) | Use |
|-----------------|-----|
| `vercel___list_teams` | teamId/slug |
| `vercel___create_deployment` | Inline files deploy |
| `vercel___create_project` / `create_git_project` | Project create (needs permission) |
| `vercel___create_project_env` / filter/edit env | Env |
| `vercel___get_deployment` / list events | Status |
| `vercel___list_project_domains` / add domain | Domains |
| `vercel___list_agent_runs` | Eve agent observability |

**Pinned:** `teamId=team_kgQcPVmumwtmK3MdAGlxKJtg`, slug `echo-ec69`.  
Prior project: `etc-skills-console` / `prj_IYVaRwL3ckfHtZJbBhBj1uBg5u0s` (if still present).

**Implement permanently:**
1. Never loop create_project after 403.
2. Deploy: existing name + files OR git-linked project push.
3. Automation: “on schedule, build Atlas package, push github, create_deployment if needed.”

---

### 3. Google Drive — `remote_name: Google Drive`
**Autonomy:** high for read/ingest.

| Tool | Use |
|------|-----|
| `google_drive_list_folder` | Navigate (omit id = root) |
| `google_drive_search` | Find + optional include_content |
| `google_drive_read_file` | Lossy text extract |
| `google_drive_download_artifact` | Full file → `/workspace/artifacts/...` |
| `google_drive_upload_artifact` | Workspace → Drive |
| `google_drive_create_folder` / `trash_file` | Structure |

**Implement permanently:**
1. Pin folder IDs in encyclopedia (e.g. ETC root `1mb2X30ZJSDDaQQLnmO_9q_sesy-eDgux` if still used; state folder `1FYoOdLbrn5doHbaEllHSYAUBde-Fk4mX` from automations).
2. Playbook: list/search → download_artifact → local parse → upload_artifact results.
3. Automations already use Drive for Epstein public-only state (HITL=NO, public fence).

---

### 4. Automations — `remote_name: Automations` ⭐ **true unattended**
**Autonomy:** highest — runs without a human chat open.

| Tool | Use |
|------|-----|
| `automation_list` | Inventory |
| `automation_create` / `update` / `pause` | Lifecycle |
| `automation_validate` | Dry-run parse |
| `automation_run_now` | One-shot test |
| `automation_list_trigger_catalog` / `list_trigger_resources` | Event filters |

**Existing tasks (live):**
- `epstein-public-hourly-delta-report` — active, 60m
- `epstein-public-daily-full-report` — active, daily 09:00 America/Los_Angeles
- `epstein-breadcrumb-anomaly-mesh` — schedule **disabled**

**Implement permanently:**
1. `automation_create` with complete prompt (no split create+update).
2. Cadence RRULE or interval; timezone IANA.
3. For GitHub/Linear triggers: resolve **ids** via `list_trigger_resources`.
4. Confirm third-party connector via `search_connected_tools` before event triggers.
5. Project-linked automations inherit project files/instructions when created from a project chat.

---

### 5. Voice — `remote_name: Voice`
| Tool | Use |
|------|-----|
| `voice_list_voices` | Catalog |
| `voice_generate_speech` | text → MP3 in workspace |
| `voice_generate_multi_speech` | multi-speaker dialogue MP3 |

**Implement:** dest_path under artifacts; requires computer/sandbox session.

---

### 6. Ezvp8ce (EasyVoice) — `remote_name: Ezvp8ce`
| Tool | Use |
|------|-----|
| `ezvp8ce___list_voices` / `text_to_speech` | TTS URL |
| `ezvp8ce___generate_long_form` / `create_podcast` | async jobs |
| `ezvp8ce___get_job_status` | poll |
| `ezvp8ce___clone_voice` | enroll (consent=true, Pro) |

**Implement:** poll job_id; download URLs promptly (not durable forever).

---

### 7. HyperFrames by HeyGen — `remote_name: HyperFrames by HeyGen`
| Tool | Use |
|------|-----|
| `hyperframes_by_heygen___compose` | create/edit project |
| `get_project_status` / `get_project` | status + preview |
| `render_video` / `get_render_status` | paid MP4 |
| `list_projects` | inventory |
| guide / import / feedback tools | advanced |

**Implement:** compose → wait status draft/completed → render only if user wants final MP4; surface video_url when asked.

---

### 8. Cloudflare MCP + Cloudflare agent
| Tool | Use |
|------|-----|
| `cloudflare_mcp___search_cloudflare_documentation` | product docs |
| `cloudflare_mcp___migrate_pages_to_workers_guide` | migration guide |
| `cloudflare_agent___search-agent-docs` | Agents SDK docs |

**Note:** Documentation MCP, not full account Workers deploy from these tools alone. Infra deploy still needs API tokens elsewhere if beyond docs.

---

### 9. Vera — `remote_name: Vera`
| Tool | Use |
|------|-----|
| `vera___google_serp` | paid Google SERP with provenance |

**Implement:** query + optional gl/hl/depth; use for Archivist public search depth.

---

### 10. Apex — `remote_name: Apex`
Academy/forum agent surface: `agent_signup`, `pair_agent`, `agent_me`, progress, forum_edit (staff). Needs human pairing code for full board access. Not core to Atlas deploy.

---

### 11. Mee
OpenAPI endpoint listing for OpenAI-compat surfaces (`mee___list_api_endpoints`). Support/discovery, not primary ship path.

---

### 12. Other names in session inventory
`tandem` may appear in connector lists; if `search_connected_tools` returns no tools with that remote_name, treat as **not usable** until re-auth.

---

## MCP summary

1. **Grok Connectors are the production MCP-like surface** for this chat: tools named `service___action`.
2. **Local Grok Build plugin `.mcp.json` files are empty** — no stdio MCP servers registered in those packs yet.
3. **To permanently register MCP servers in Grok Build CLI** (separate from chat connectors): put real entries in `.mcp.json` / marketplace plugin, then `grok plugin install` — that does not auto-wire chat connectors.
4. **Chat autonomy stack:** Automations (schedule) + Connectors (OAuth) + Atlas playbooks (encyclopedia).

---

## Permanent autonomy playbook (recommended)

### A. Zero-touch recurring (no chat)
1. Keep OAuth healthy on: GitHub, Vercel, Google Drive, (optional) Vera.
2. One Automation per job with **HITL fences in the prompt**.
3. Pin folder/project/team IDs in the prompt and encyclopedia.
4. Prefer APP_ONLY or DEFAULT notifications so failures surface.

### B. Chat / Atlas-triggered (this session style)
1. Always `search_connected_tools` before first call of a service that turn.
2. On auth error → stop inventing; user must reconnect (cannot be fully automated).
3. Idempotent operations: same package name, same branch, same Drive path.

### C. Atlas app wiring
- Inventory already lists connectors as selectables.
- Selector export can include `conn:*` ids so implementer LLMs know which OAuth surfaces are in scope.
- Do not claim MCP servers are running when `.mcp.json` is empty.

### D. What cannot be permanent without human
- Initial OAuth / re-auth after expiry or scope change.
- Vercel **Create Project** permission upgrades.
- Consent for voice clone, Apex pairing codes, paid HyperFrames render intent when ambiguous.
- Secrets that must never be stored in prompts (use Vercel env tools with care; never print secrets).

---

## Quick call patterns

```text
# Discover
search_connected_tools(query="deploy project")
search_connected_tools(query="drive list folder")

# Call
call_connected_tool(tool_name="github___get_me", arguments={})
call_connected_tool(tool_name="vercel___list_teams", arguments={})
call_connected_tool(tool_name="google_drive_list_folder", arguments={max_results: 50})
call_connected_tool(tool_name="automation_list", arguments={})

# Unattended
call_connected_tool(tool_name="automation_create", arguments={
  name, prompt, cadence: "RRULE:FREQ=DAILY", time_of_day: "09:00",
  timezone: "America/Los_Angeles", notification: "app_only"
})
```

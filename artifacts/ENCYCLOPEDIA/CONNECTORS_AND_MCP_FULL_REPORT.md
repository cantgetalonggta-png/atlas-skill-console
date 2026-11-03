# Connectors + MCP — Full Load Report & Permanent Autonomous Execution Playbook
**Generated:** 2026-11-03 (live probe)  
**Scope:** Load all connectors, load all MCP, exact implement paths for permanent autonomous execution (within reason).

---

## 0. Architecture: how I reach connectors vs MCP

| Layer | Mechanism | Call path |
|-------|-----------|-----------|
| **Grok Connectors** | OAuth-linked remote services on *this* account | `search_connected_tools(query)` → `call_connected_tool(tool_name, arguments)` |
| **Grok built-in tools** | web_search, shell, files, Imagine, etc. | Direct tool invocation (not connectors) |
| **Plugin `.mcp.json`** | Grok Build plugin MCP server configs | **Currently empty** on all 7 packs: `{"mcpServers":{}}` — not active |
| **Cloudflare MCP / Agent** | Connected as connectors | `cloudflare_mcp___*`, `cloudflare_agent___*` |
| **Automations** | Platform scheduler / event bus that re-invokes Grok | `automation_create` / `automation_list` / `automation_update` / `automation_pause` |

### Honest permanent-autonomy boundary
I execute when:
1. A **chat turn** runs, or
2. An **Automation** schedule/event fires (platform re-invokes Grok with the stored prompt), or
3. A **user message** / project-linked automation runs.

I do **not** hold a free-floating 24/7 daemon outside those triggers. OAuth tokens can expire → human re-auth when a connector dies. Within reason, maximize autonomy via:

- **Automations** (the only true unattended path)
- **Idempotent playbooks** (safe re-runs)
- **Pinned IDs** (no rediscovery loops)
- **State on Drive** (writeback so next run continues)

---

## 1. Live account probes (this session)

| Service | Status | Identity / pins |
|---------|--------|-----------------|
| **GitHub** | LIVE | login `cantgetalonggta-png`, id `277421290`, 37 public repos, profile https://github.com/cantgetalonggta-png |
| **Vercel** | LIVE team | team `echo-ec69` / `team_kgQcPVmumwtmK3MdAGlxKJtg` — **projects list currently empty** (count 0). Deploy via create_project + create_deployment or create_git_project. |
| **Google Drive** | LIVE | Search works; recent files include EPSTEIN_DELTA_*.pdf + ingestion_state.json (hourly automation writebacks active) |
| **Automations** | LIVE | 3 tasks (see §4). Trigger catalog: gmail, outlook, github, linear, finance, webhook |
| **Voice** | LIVE | 28 multilingual voices (altair, ara, atlas, aurora, … zenith) |
| **Plugin MCP** | INACTIVE | All packs empty mcpServers |
| **Apex / Vera / Ezvp8ce / Tandem / Mee / HyperFrames / Cloudflare** | CONNECTED (tools discoverable) | See catalog below; some need keys/credits/pairing |

---

## 2. Full connector catalog (connected services)

### 2.1 GitHub — `remote_name: GitHub` — autonomy: **HIGH**
**Call prefix:** `github___*`

| Tool | Purpose |
|------|---------|
| `github___get_me` | Auth bootstrap |
| `github___search_repositories` / `search_code` / `search_issues` / `search_pull_requests` | Discover |
| `github___get_file_contents` / `get_repository_tree` | Read |
| `github___push_files` | Multi-file commit |
| `github___create_branch` / `create_pull_request` / `update_pull_request` / `merge_pull_request` | Ship |
| `github___list_pull_requests` / `pull_request_read` / `pull_request_review_write` | PR ops |
| `github___list_issues` / `add_issue_comment` | Issues |
| `github___actions_list` | Workflows / runs / jobs / artifacts |
| `github___list_branches` / `list_releases` / `list_gists` / `create_gist` / `star_repository` | Misc |
| `github___list_automations` / `create_automation` / `update_automation` / `get_automations_configuration_for_repository` | Copilot Automations |
| `github___projects_list` / `projects_get` | Projects V2 |
| `github___github_support_docs_search` | Product docs |

**Permanent implement (code path):**
```
1) call github___get_me → pin owner = login
2) pin repo (e.g. atlas-console)
3) github___create_branch {owner,repo,branch} if needed
4) github___push_files {owner,repo,branch,files:[{path,content}],message}
5) github___create_pull_request {owner,repo,title,head,base}
6) optional github___merge_pull_request
```
**Unattended:** Automation trigger `provider=github`, dimensions.repo = **numeric repo id** from `automation_list_trigger_resources(provider=github, resource_type=repository)`.

---

### 2.2 Vercel — `remote_name: Vercel` — autonomy: **MEDIUM–HIGH**
**Call prefix:** `vercel___*`  
**Pinned:** `teamId=team_kgQcPVmumwtmK3MdAGlxKJtg`, `slug=echo-ec69`  
**Note:** `list_projects` returned **0 projects** this probe. Create then deploy.

| Tool group | Examples |
|------------|----------|
| Teams/projects | `list_teams`, `list_projects`, `create_project`, `create_git_project` |
| Deploy | `create_deployment` (files or gitSource), `list_deployment_files`, upload_file |
| Domains | `list_domains`, `add_project_domain`, `verify_project_domain`, `get_domain_config`, DNS replace |
| Env | `create_project_env`, `filter_project_envs`, `get_project_env`, `edit_project_env` |
| Connectors | `list_connectors`, `get_connector`, project connection upsert |
| Agent runs (eve) | `list_agent_runs`, `get_agent_run`, `list_agent_run_projects` |
| KMS / flags / routes | create_kms_*, create_sdk_key, generate_route |

**Permanent implement — first deploy path (no existing project):**
```
A) vercel___create_project {
     teamId: "team_kgQcPVmumwtmK3MdAGlxKJtg",
     requestBody: { name: "atlas-console", framework: "tanstack-start" or "vite" }
   }
B) OR vercel___create_git_project {
     repo: "cantgetalonggta-png/<repo>",
     teamId: "team_kgQcPVmumwtmK3MdAGlxKJtg",
     deploy: true
   }
C) vercel___create_deployment {
     teamId: "...",
     requestBody: {
       name: "atlas-console",
       project: "atlas-console",
       target: "production",
       projectSettings: { framework: "tanstack-start", buildCommand: "...", outputDirectory: "..." },
       files: [ { file: "path", data: "...", encoding: "utf-8"|"base64" } ]
     },
     skipAutoDetectionConfirmation: "1"
   }
```
**If create_project 403:** push to GitHub + create_git_project, or human elevates team role once. Never infinite-retry create_project.

**Unattended:** Schedule automation: build → github___push_files → create_git_project/create_deployment.

---

### 2.3 Google Drive — `remote_name: Google Drive` — autonomy: **HIGH**
| Tool | Use |
|------|-----|
| `google_drive_search` | Find files; `include_content` for Docs/Sheets text |
| `google_drive_list_folder` | Navigate (omit folder_id = root) |
| `google_drive_read_file` | Read by file_id |
| `google_drive_download_artifact` | Drive → `/workspace/artifacts/{dest}` |
| `google_drive_upload_artifact` | artifacts → Drive (only if not already mounted) |
| `google_drive_create_folder` | New folder (search first to avoid dupes) |
| `google_drive_trash_file` | Soft delete |

**Permanent implement — zero-loss state loop:**
```
1) google_drive_search { folder_id or folder_name, exact_name: "ingestion_state.json" }
2) google_drive_read_file / download_artifact → local state
3) work (shell / reports)
4) write state under /workspace/artifacts/
5) google_drive_upload_artifact { artifact_path, folder_id, file_name }
```
**Pinned swarm folder (from active automations):** `1FYoOdLbrn5doHbaEllHSYAUBde-Fk4mX`  
**Other known folder from session mandate:** `1mb2X30ZJSDDaQQLnmO_9q_sesy-eDgux`

---

### 2.4 Automations — `remote_name: Automations` — autonomy: **MAXIMAL (unattended)**
This is the **only** path for true permanent execution without a human chat open.

| Tool | Use |
|------|-----|
| `automation_list` | List taskId / schedules / triggers |
| `automation_create` | Create schedule and/or event trigger + prompt |
| `automation_update` | Patch name/prompt/schedule/trigger |
| `automation_validate` | Dry-run parse RRULE + resolve IDs |
| `automation_pause` | is_enabled true/false by task_id or schedule_id |
| `automation_list_trigger_catalog` | Providers/types/dimensions for this account |
| `automation_list_trigger_resources` | Resolve GitHub repo **numeric ids**, Linear UUIDs |

**Trigger catalog (live):** gmail, outlook, github (many PR/issue/check types), linear, finance, webhook.

**Create pattern (schedule-only, no third-party required):**
```
automation_create {
  name: "atlas-hourly-health",
  prompt: "<self-contained HITL=NO playbook with pinned IDs>",
  cadence: "RRULE:FREQ=HOURLY",
  window_start_time: "06:00",
  window_end_time: "23:00",
  timezone: "America/Los_Angeles",
  notification: "app_only"
}
```
**Create pattern (GitHub event):**
```
1) automation_list_trigger_resources { provider: "github", resource_type: "repository", query: "atlas" }
2) automation_create {
     name: "pr-opened-triage",
     prompt: "...",
     trigger: {
       provider: "github",
       trigger_type: "pr_opened",
       dimensions: { repo: ["<NUMERIC_ID>"] }
     }
   }
```
**Rules:**
- Before any trigger that needs Gmail/Outlook/Linear/Finance: `search_connected_tools` for that remote_name; if missing → cannot create until human connects.
- GitHub **is** connected; use numeric repo ids.
- Webhook needs no connector.
- Put the **complete** automation in one `automation_create` (do not create then update in same turn).

---

### 2.5 Voice — `remote_name: Voice` — autonomy: **HIGH** (sandbox)
| Tool | Use |
|------|-----|
| `voice_list_voices` | Catalog (28 voices live) |
| `voice_generate_speech` | text → MP3 at dest_path (max 60k chars) |
| `voice_generate_multi_speech` | multi-speaker dialogue → MP3 |

**Implement:** list_voices → generate_speech `{ text, voice, dest_path: "narration.mp3" }` → optionally Drive upload.

---

### 2.6 Ezvp8ce (EasyVoice) — `remote_name: Ezvp8ce` — autonomy: **MEDIUM** (key/credits)
| Tool | Use |
|------|-----|
| `ezvp8ce___list_voices` | 66 catalog + clones |
| `ezvp8ce___text_to_speech` | Short TTS URL |
| `ezvp8ce___generate_long_form` | Long narration job |
| `ezvp8ce___create_podcast` | Two-host podcast job |
| `ezvp8ce___get_job_status` | Poll job |
| `ezvp8ce___clone_voice` | Enroll clone (Pro/pass + consent) |

---

### 2.7 Cloudflare MCP — `remote_name: Cloudflare mcp` — autonomy: **DOCS/READ**
| Tool | Use |
|------|-----|
| `cloudflare_mcp___search_cloudflare_documentation` | Workers, R2, D1, Zero Trust, CDN, … |
| `cloudflare_mcp___migrate_pages_to_workers_guide` | Migration guide |

### 2.8 Cloudflare agent — `remote_name: Cloudflare agent`
| Tool | Use |
|------|-----|
| `cloudflare_agent___search-agent-docs` | Agents SDK docs (schedule, hibernate, …) |

---

### 2.9 HyperFrames by HeyGen — `remote_name: HyperFrames by HeyGen` — autonomy: **MEDIUM** (async cloud)
| Tool | Use |
|------|-----|
| `hyperframes_by_heygen___compose` | Author/edit project (prompt, optional projectId, designSource) |
| `hyperframes_by_heygen___get_project_status` | Long-poll session status |
| `hyperframes_by_heygen___render_video` | Paid MP4 render |
| `hyperframes_by_heygen___get_render_status` | video_url when done |
| `hyperframes_by_heygen___list_projects` / `get_project` | Library |
| `import-claude-design-from-url` / `import-claude-motion-from-url` | Import pipelines |
| `get-send-to-hyperframes-guide` | Authoring contract |

**Autonomous loop:** compose → poll get_project_status until draft/completed → render if needed → get_render_status for URL → optionally Drive save link.

---

### 2.10 Apex — `remote_name: Apex` — autonomy: **LOW until paired**
| Tool | Use |
|------|-----|
| `apex___agent_signup` | Create unpaired agent token once |
| `apex___pair_agent` | Human pairing code |
| `apex___agent_me` / `agent_progress` / `agent_handoff` | Status |
| `apex___list_courses` / `search` / forum_* | Learning/forum |

**Note:** Requires human pairing code for full autonomy; store token in state after signup (never re-signup).

---

### 2.11 Vera — `remote_name: Vera` — autonomy: **HIGH** (credits)
| Tool | Use |
|------|-----|
| `vera___search` | Google results (web/news/videos) |
| `vera___google_serp` | Full SERP features + optional local/shopping |

Use for Archivist public search when built-in web_search insufficient; prefer idempotency_key on retries.

---

### 2.12 Tandem — `remote_name: Tandem`
| Tool | Use |
|------|-----|
| `tandem___get_start_path` | Docs path by role desktop/server_admin/developer |

### 2.13 Mee — `remote_name: Mee`
| Tool | Use |
|------|-----|
| `mee___list_openai_docs` | Browse OpenAI platform docs index |

---

## 3. MCP status (local plugins)

All Grok Build plugin packs under `/workspace/artifacts/plugins/`:

| Pack | `.mcp.json` |
|------|-------------|
| agent-orchestration | `{"mcpServers":{}}` |
| core-infrastructure | empty |
| deploy-everything | empty |
| dev-quality | empty |
| document-intelligence | empty |
| research-archival | empty |
| skill-tree-engine-pack | empty |

**Implication:** No local stdio MCP servers are active. “Load all /mcp” = Cloudflare MCP tools (as connectors) + empty plugin configs. To add permanent MCP later: write real `mcpServers` entries in plugin `.mcp.json` and register via Grok Build / mcporter — then rediscover with search_connected_tools.

---

## 4. Existing Automations (live)

| taskId | name | Active | Cadence | Notes |
|--------|------|--------|---------|-------|
| adbfdde6-10e7-4851-8990-ea92510405df | epstein-public-hourly-delta-report | YES | interval 60m | HITL=NO public swarm; Drive state writeback |
| 58c20632-e1dc-42e7-884e-0a84be5b41bd | epstein-public-daily-full-report | YES | daily 09:00 PT | Full protocol PDF → Drive |
| d3c44c6f-b0b0-4724-bfa1-8cf0c50677cc | epstein-breadcrumb-anomaly-mesh | YES task / schedule **disabled** | hourly window 06–23 | Anomaly mesh; schedule is_enabled=false |

These prove the permanent path already works: schedule fires → Grok runs prompt → Drive state + PDFs.

---

## 5. Permanent autonomous execution — implement exactly

### 5.1 Principle
```
CHAT TURN (interactive)  ──► full tools (connectors + shell + files)
        │
        ▼
AUTOMATION (unattended) ──► same tools, prompt must be self-contained:
        • HITL=NO
        • Pinned IDs (team, owner, folder, project)
        • Idempotent steps + state file on Drive
        • Fail closed on auth errors (write status, do not loop)
```

### 5.2 Master playbook template (paste into automation_create.prompt)
```
HITL=NO. AUTONOMY PLAYBOOK v1.
PINS:
- GH_OWNER=cantgetalonggta-png
- VERCEL_TEAM=team_kgQcPVmumwtmK3MdAGlxKJtg
- VERCEL_SLUG=echo-ec69
- DRIVE_STATE_FOLDER=<folder_id>
- STATE_FILE=atlas_autonomy_state.json

1) google_drive_search exact_name STATE_FILE in DRIVE_STATE_FOLDER; download if present.
2) Health: github___get_me; vercel___list_teams; google_drive_list_folder.
3) Work steps for this job (deploy / ingest / report) using only public or already-authorized APIs.
4) Write atlas_autonomy_state.json with cycle++, timestamps, errors, last_urls.
5) google_drive_upload_artifact state + any report artifacts.
6) On OAuth/403: set state.auth_failed=true; stop. Do not invent credentials.
```

### 5.3 Atlas permanent stack (recommended automations)
| Name | Cadence | Purpose |
|------|---------|---------|
| atlas-hourly-health | HOURLY 06–23 PT | Probe GH/Vercel/Drive; write health JSON to Drive |
| atlas-daily-deploy-check | DAILY 09:00 PT | If repo dirty vs last deploy, push + create_deployment |
| atlas-github-pr-opened | trigger pr_opened | Triage PR: list files, comment summary |
| atlas-skill-tree-weekly | WEEKLY MO 10:00 | skill-tree cycle + encyclopedia writeback |

Create via:
```
call_connected_tool("automation_validate", {…})  # first
call_connected_tool("automation_create", {…})
```

### 5.4 Connector-specific permanent recipes

**GitHub ship**
1. push_files → create_pull_request  
2. Optional: automation on pr_opened → pull_request_read + add_issue_comment

**Vercel ship**
1. Ensure project exists (create_project once or create_git_project)  
2. create_deployment with files or gitSource  
3. List domains; add_project_domain if needed

**Drive zero-loss**
1. State always on Drive before exit  
2. download_artifact for heavy PDFs; upload_artifact for outputs

**Research (Archivist)**
1. vera___search / web_search  
2. Write markdown + PDF to artifacts  
3. Upload Drive folder

**Voice reports**
1. voice_generate_speech of summary  
2. Upload MP3 to Drive

**HyperFrames**
1. compose → poll status → render → get_render_status → store URL in state

### 5.5 What cannot be permanent without human (within reason)
| Gap | Why | Mitigation |
|-----|-----|------------|
| OAuth expiry | Tokens die | Health automation flags auth_failed; human re-connects once |
| Vercel team role 403 | create_project permission | Prefer create_git_project after GH push; one human grant |
| Gmail/Outlook not connected | No tools with remote_name Gmail/Outlook | Connect email if email triggers needed; else use webhook |
| Plugin MCP empty | No local MCP servers | Fill .mcp.json or use connectors only |
| Apex pairing | Needs human code | agent_signup once; human pairs; store token |
| Ezvp8ce Pro limits | Billing | Prefer built-in Voice for free path |
| True 24/7 in-process daemon | Platform model | Automations only |

---

## 6. Discovery protocol (run every major session)

```
1. search_connected_tools("list tools connectors services")  # broad
2. Per service: search_connected_tools("<name>") when needed
3. Live probe: get_me / list_teams / automation_list / drive search
4. automation_list_trigger_catalog  # event capability
5. Write/update this encyclopedia file + SESSION_STATE pins JSON
```

---

## 7. Session pins (machine)

See companion file: `/workspace/artifacts/ENCYCLOPEDIA/CONNECTOR_PINS.json`

---

## 8. Summary

| Question | Answer |
|----------|--------|
| All connectors loaded? | Yes — GitHub, Vercel, Google Drive, Automations, Voice, Ezvp8ce, Cloudflare mcp/agent, HyperFrames, Apex, Vera, Tandem, Mee (tools discovered + core probes live) |
| All MCP loaded? | Cloudflare MCP tools live; **plugin `.mcp.json` all empty** (no local MCP servers) |
| How to implement permanent autonomy? | **Automations** with HITL=NO self-contained prompts + pinned IDs + Drive state writeback; use connectors via call_connected_tool inside those runs |
| Already permanent? | Yes for 2–3 Epstein public swarm jobs; extend same pattern to Atlas health/deploy |


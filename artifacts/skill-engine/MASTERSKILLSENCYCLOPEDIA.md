# Master Skills Encyclopedia

## Archivist 200-Search Protocol

- **id:** `sk_archivist_200_search_protocol`
- **version:** 5
- **domain:** Research Knowledge & Archival
- **definition:** Clinical empirical multi-search with strict data-only outputs
- **purpose:** Master-level fact base
- **inputs:** topic
- **outputs:** data tables
- **dependencies:** archivist
- **subskills:** —
- **tags:** archivist, research

## ClawHub Registry Ops

- **id:** `sk_clawhub_registry_ops`
- **version:** 1
- **domain:** Development CI Build & Deploy
- **definition:** Search install update publish skills via clawhub CLI
- **purpose:** Expand capability surface
- **inputs:** query
- **outputs:** installed skill
- **dependencies:** clawhub
- **subskills:** —
- **tags:** registry, skills

## Deploy Everything Plugin Pack

- **id:** `sk_deploy_everything_plugin_pack`
- **version:** 5
- **domain:** Development CI Build & Deploy
- **definition:** Categorized Grok Build plugins ready for marketplace and project install
- **purpose:** One-shot capability expansion
- **inputs:** plugin dirs
- **outputs:** installable packs
- **dependencies:** grok-build-plugins
- **subskills:** —
- **tags:** deploy, plugins

## Document Vault Ingest

- **id:** `sk_document_vault_ingest`
- **version:** 5
- **domain:** Document Media & File Intelligence
- **definition:** Hash+metadata+tag every PDF/md/json/py into ordered vault
- **purpose:** Searchable zero-loss archive
- **inputs:** files
- **outputs:** vault entries
- **dependencies:** document-ingestion, document-intelligence
- **subskills:** —
- **tags:** vault, rag

## Grok Build Plugin Package

- **id:** `sk_grok_build_plugin_package`
- **version:** 1
- **domain:** Core Infrastructure & Tooling
- **definition:** Installable extension bundling skills, slash commands, agents, hooks, MCP, LSP
- **purpose:** Extend Grok Build without separate processes
- **inputs:** plugin.json, skills/
- **outputs:** loaded plugin
- **dependencies:** grok-build-plugins
- **subskills:** —
- **tags:** plugin, mcp, hooks

## Plugin Locations Map

- **id:** `sk_plugin_locations_map`
- **version:** 1
- **domain:** Core Infrastructure & Tooling
- **definition:** Canonical paths for project/user/marketplace plugins
- **purpose:** Portable plugin placement
- **inputs:** ~/.grok/plugins
- **outputs:** resolved roots
- **dependencies:** —
- **subskills:** —
- **tags:** paths, filesystem

## Skill Tree Cycle

- **id:** `sk_skill_tree_cycle`
- **version:** 1
- **domain:** Research Knowledge & Archival
- **definition:** Distill-analyze-synthesize-ontologize-infer-critique-upgrade loop
- **purpose:** Continuous skill ontology growth
- **inputs:** user message, files
- **outputs:** atoms, trees, insights
- **dependencies:** skill-tree-engine
- **subskills:** —
- **tags:** ontology, engine

## Swarm Agent Framework Background

- **id:** `sk_swarm_agent_framework_background`
- **version:** 5
- **domain:** Agent Orchestration & Multi-Agent
- **definition:** Complex multi-worker orchestration as durable background tasks
- **purpose:** Parallel infrastructure upgrade
- **inputs:** task set
- **outputs:** worker results
- **dependencies:** swarm-agent-framework, agent-orchestration
- **subskills:** —
- **tags:** swarm, background

## Team of Four R&D

- **id:** `sk_team_of_four_r_d`
- **version:** 5
- **domain:** Agent Orchestration & Multi-Agent
- **definition:** Captain Grok + Harper research + Benjamin logic/code + Lucas contrarian
- **purpose:** Pressure-tested development
- **inputs:** question
- **outputs:** merged answer
- **dependencies:** grok-4-20-multi-agent
- **subskills:** —
- **tags:** multi-agent, rd

## Zero Loss Drive Ingest

- **id:** `sk_zero_loss_drive_ingest`
- **version:** 1
- **domain:** Document Media & File Intelligence
- **definition:** Recursive list+download of Drive folder with hash and metadata
- **purpose:** Complete workspace parity
- **inputs:** folder_id
- **outputs:** local tree
- **dependencies:** document-ingestion
- **subskills:** —
- **tags:** drive, ingest

export type Layer =
  | "orchestration"
  | "research"
  | "documents"
  | "quality"
  | "platform"
  | "channels"
  | "domain";

export type Skill = {
  id: string;
  layer: Layer;
  purpose: string;
  triggers: string;
  plugin: string;
};

export type Plugin = {
  name: string;
  version: string;
  category: string;
  description: string;
  keywords: string[];
  parts: string[];
};

export const layers: { id: Layer; label: string }[] = [
  { id: "orchestration", label: "Orchestration" },
  { id: "research", label: "Research" },
  { id: "documents", label: "Documents" },
  { id: "quality", label: "Quality" },
  { id: "platform", label: "Platform" },
  { id: "channels", label: "Channels" },
  { id: "domain", label: "Domain" },
];

export const skills: Skill[] = [
  { id: "agent-orchestration", layer: "orchestration", purpose: "Routes a task across named agents with a single owner and a written handoff.", triggers: "multi-agent, team, delegate", plugin: "agent-orchestration" },
  { id: "grok-4-20-multi-agent", layer: "orchestration", purpose: "Team-of-four research loop: plan, search, critique, then write only what survived.", triggers: "team of four, parallel research", plugin: "agent-orchestration" },
  { id: "swarm-agent-framework", layer: "orchestration", purpose: "Background swarm for independent workstreams that must not share a schema.", triggers: "swarm, background agents", plugin: "agent-orchestration" },
  { id: "prose", layer: "orchestration", purpose: "Prose virtual machine: long instructions stay as executable steps, not vibes.", triggers: "prose vm, instruction program", plugin: "agent-orchestration" },
  { id: "mega-skill", layer: "orchestration", purpose: "Composes several skills into one invocation without dropping their constraints.", triggers: "compose skills, mega", plugin: "skill-tree-engine-pack" },
  { id: "tool-use", layer: "orchestration", purpose: "Chooses a tool only when the next fact cannot be known from context.", triggers: "tool choice, function call", plugin: "core-infrastructure" },
  { id: "mcporter", layer: "orchestration", purpose: "Ports MCP server configs between Claude-style and Grok plugin layouts.", triggers: "mcp port, .mcp.json", plugin: "core-infrastructure" },
  { id: "clawhub", layer: "research", purpose: "Looks up OpenClaw's public skill registry. Not a Grok marketplace source by itself.", triggers: "clawhub, skill registry", plugin: "research-archival" },
  { id: "archivist", layer: "research", purpose: "Clinical 200-search mode: cite, separate claim from source, stop when the tranche repeats.", triggers: "archivist, 200-search, batch", plugin: "research-archival" },
  { id: "each-structured-prompt-research", layer: "research", purpose: "Turns one question into a fixed prompt card before any search runs.", triggers: "structured prompt, research card", plugin: "research-archival" },
  { id: "ethical-data-harvesting", layer: "research", purpose: "Collects only what the source allows, with attribution and a stop rule.", triggers: "ethical harvest, robots", plugin: "research-archival" },
  { id: "ethical-scraper-orchestration", layer: "research", purpose: "Schedules scrapers behind the same allowlist and rate budget.", triggers: "scraper, allowlist", plugin: "research-archival" },
  { id: "next-investigation-trigger", layer: "research", purpose: "Writes the next search only after the last result changed a belief.", triggers: "next search, trigger", plugin: "research-archival" },
  { id: "document-ingestion", layer: "documents", purpose: "Zero-loss intake: inventory every file, then parse, then mark the checklist.", triggers: "ingest, vault, zero-loss", plugin: "document-intelligence" },
  { id: "document-intelligence", layer: "documents", purpose: "Reads PDF, markdown, and JSON into sections a later agent can cite.", triggers: "pdf, markdown, distill", plugin: "document-intelligence" },
  { id: "epstein-pdf-batch-ingest", layer: "documents", purpose: "Batch PDF lane with page-stable ids so quotes stay findable.", triggers: "pdf batch, page id", plugin: "document-intelligence" },
  { id: "pdf-page-section-breakdown", layer: "documents", purpose: "Splits a PDF into page and heading spans before summarising.", triggers: "pdf pages, sections", plugin: "document-intelligence" },
  { id: "nano-pdf", layer: "documents", purpose: "Small-PDF path when a full OCR pass would destroy more than it saves.", triggers: "small pdf, nano", plugin: "document-intelligence" },
  { id: "obsidian-vault-maintainer", layer: "documents", purpose: "Keeps vault notes linked, dated, and free of duplicate titles.", triggers: "obsidian, vault note", plugin: "document-intelligence" },
  { id: "9000-word-minimum", layer: "quality", purpose: "Refuses a short answer when the contract demands a long, sourced one.", triggers: "long form, 9000 words", plugin: "dev-quality" },
  { id: "common-sense-logic-critical-thinking", layer: "quality", purpose: "Checks the plan against what would actually break in the world.", triggers: "critical thinking, sanity", plugin: "dev-quality" },
  { id: "coherent-communication", layer: "quality", purpose: "One claim per sentence; no new metaphor that hides a missing fact.", triggers: "clarity, coherent", plugin: "dev-quality" },
  { id: "tdd-rust", layer: "quality", purpose: "Test first for Rust changes: failing check, then the smallest fix.", triggers: "rust, tdd", plugin: "dev-quality" },
  { id: "issue-triage", layer: "quality", purpose: "Sorts a bug into repro, owner, and whether it blocks ship.", triggers: "triage, issue", plugin: "dev-quality" },
  { id: "rtk-triage", layer: "quality", purpose: "Fast triage rubric when the queue is larger than the hour.", triggers: "rtk, queue", plugin: "dev-quality" },
  { id: "oss-compliance-gate", layer: "quality", purpose: "Blocks a dependency whose license cannot ship with the app.", triggers: "license, oss gate", plugin: "dev-quality" },
  { id: "blacksmith-testbox", layer: "quality", purpose: "Isolated test box so a failing suite cannot dirty the worktree.", triggers: "testbox, isolate", plugin: "dev-quality" },
  { id: "grok-build-plugins", layer: "platform", purpose: "Packages skills, hooks, and MCP into a marketplace entry with a sha pin.", triggers: "plugin.json, marketplace", plugin: "deploy-everything" },
  { id: "skill-tree-engine", layer: "platform", purpose: "Cycles discovery, representation, retrieval, and evolution of the skill tree.", triggers: "skill tree, cycle", plugin: "skill-tree-engine-pack" },
  { id: "run-everything-activation", layer: "platform", purpose: "Activation plan: inventory, heal, install core, then prove one live path.", triggers: "activation, T-matrix", plugin: "core-infrastructure" },
  { id: "continue-next-or-continue", layer: "platform", purpose: "On NEXT, resume the last unfinished tranche instead of restating it.", triggers: "continue, next", plugin: "core-infrastructure" },
  { id: "self-dev-resources", layer: "platform", purpose: "Prefers tools already in the workspace before asking for a new install.", triggers: "self host, local tools", plugin: "core-infrastructure" },
  { id: "vite", layer: "platform", purpose: "Dev server and static build contract, including the preview port.", triggers: "vite, frontend build", plugin: "deploy-everything" },
  { id: "github", layer: "platform", purpose: "Repo, file, and pull-request operations with the connected GitHub account.", triggers: "github, pull request", plugin: "deploy-everything" },
  { id: "external-api-wrapper", layer: "platform", purpose: "Wraps a third-party HTTP API with timeouts and a typed error.", triggers: "http wrapper, api", plugin: "core-infrastructure" },
  { id: "batch-api-wrapper", layer: "platform", purpose: "Sends chunked jobs and records which chunk failed.", triggers: "batch api, chunks", plugin: "core-infrastructure" },
  { id: "apple-notes", layer: "channels", purpose: "Reads or files notes where Apple Notes is the user's system of record.", triggers: "apple notes", plugin: "core-infrastructure" },
  { id: "bluebubbles", layer: "channels", purpose: "iMessage bridge via BlueBubbles. Needs that server; do not invent a send.", triggers: "imessage, bluebubbles", plugin: "core-infrastructure" },
  { id: "qqbot-channel", layer: "channels", purpose: "QQ bot channel adapter. Only live when the bot token is configured.", triggers: "qq, bot channel", plugin: "core-infrastructure" },
  { id: "gog", layer: "channels", purpose: "Google Workspace surface (Drive, Docs) through the connected account.", triggers: "gog, google drive", plugin: "document-intelligence" },
  { id: "wacli", layer: "channels", purpose: "WhatsApp CLI bridge. Sends only after an explicit user ask.", triggers: "whatsapp, wacli", plugin: "core-infrastructure" },
  { id: "omnivoice-api", layer: "channels", purpose: "Voice synthesis or recognition through the OmniVoice API.", triggers: "voice, omnivoice", plugin: "core-infrastructure" },
  { id: "openai-whisper-api", layer: "channels", purpose: "Speech-to-text when a local whisper binary is not available.", triggers: "whisper, transcribe", plugin: "document-intelligence" },
  { id: "tmux", layer: "channels", purpose: "Session multiplexing for long jobs that must survive a disconnect.", triggers: "tmux, session", plugin: "core-infrastructure" },
  { id: "game-dev", layer: "domain", purpose: "Game scaffold notes: input, loop, and feel. Not a license to skip controls.", triggers: "game, canvas", plugin: "dev-quality" },
  { id: "postgresql-sql", layer: "domain", purpose: "SQL against Postgres. Scope every query; no unbounded deletes.", triggers: "sql, postgres", plugin: "dev-quality" },
  { id: "video-frames", layer: "domain", purpose: "Pulls frames from a clip for inspection, not for training data.", triggers: "video frames, ffmpeg", plugin: "document-intelligence" },
  { id: "play-billing-activation-detector", layer: "domain", purpose: "Detects whether a Play billing flow is actually armed.", triggers: "play billing, android", plugin: "dev-quality" },
  { id: "tenant-misconceptions-rebuttal", layer: "domain", purpose: "Rebuts a specific tenancy claim with the clause that contradicts it.", triggers: "tenant, rebuttal", plugin: "research-archival" },
  { id: "mongo-tom-roleplay", layer: "domain", purpose: "Named roleplay persona. Stays in fiction; does not override safety rules.", triggers: "roleplay, persona", plugin: "agent-orchestration" },
];

export const plugins: Plugin[] = [
  {
    name: "core-infrastructure",
    version: "1.0.0",
    category: "infrastructure",
    description: "Session state, inventory, heal notes, and the hands-off core install path.",
    keywords: ["session", "inventory", "install"],
    parts: ["skills/", "hooks/hooks.json", ".mcp.json"],
  },
  {
    name: "document-intelligence",
    version: "1.0.0",
    category: "documents",
    description: "PDF, markdown, and JSON intake with page-stable citations into the vault.",
    keywords: ["pdf", "vault", "ocr"],
    parts: ["skills/", ".mcp.json"],
  },
  {
    name: "agent-orchestration",
    version: "1.0.0",
    category: "agents",
    description: "Team of four, swarm lanes, and prose-VM handoffs.",
    keywords: ["swarm", "team", "handoff"],
    parts: ["skills/", "agents/", "hooks/hooks.json"],
  },
  {
    name: "research-archival",
    version: "1.0.0",
    category: "research",
    description: "Archivist tranches, ethical harvest, and the next-search trigger.",
    keywords: ["archivist", "search", "cite"],
    parts: ["skills/", ".mcp.json"],
  },
  {
    name: "deploy-everything",
    version: "1.0.0",
    category: "deployment",
    description: "Frontend, GitHub, and the Vercel file-deploy path with an honest scope check.",
    keywords: ["vercel", "github", "vite"],
    parts: ["skills/", ".mcp.json"],
  },
  {
    name: "skill-tree-engine-pack",
    version: "1.0.0",
    category: "meta",
    description: "Ontology cycles: master tree, learned tree, encyclopedia, emergent notes.",
    keywords: ["ontology", "cycle", "encyclopedia"],
    parts: ["skills/", "hooks/hooks.json"],
  },
  {
    name: "dev-quality",
    version: "1.0.0",
    category: "quality",
    description: "Triage, tests, license gate, and the critical-thinking pass before ship.",
    keywords: ["tdd", "triage", "license"],
    parts: ["skills/"],
  },
];

export const inventoryLayers = [
  { layer: "Skill tooling", count: 2 },
  { layer: "Engineering process", count: 16 },
  { layer: "Security and compliance", count: 3 },
  { layer: "Documents and knowledge", count: 11 },
  { layer: "Web and UI", count: 7 },
  { layer: "External integrations", count: 7 },
  { layer: "Agent orchestration", count: 7 },
  { layer: "General domain", count: 56 },
  { layer: "Drive ingest atoms", count: 186 },
];

export type Finding = {
  id: string;
  claim: string;
  source: string;
  href: string;
  use: string;
};

export const archivistBatch3: Finding[] = [
  {
    id: "B3-01",
    claim: "TanStack Start exposes HTTP with createFileRoute server.handlers. GET should return Response or Response.json. The same file may also render UI.",
    source: "TanStack Start server routes guide",
    href: "https://tanstack.com/start/latest/docs/framework/react/guide/server-routes",
    use: "Atlas serves /health, /api/skills, /api/plugins, /api/session, and /api/archivist this way.",
  },
  {
    id: "B3-02",
    claim: "A Grok plugin is a directory of skills, commands, agents, hooks/hooks.json, .mcp.json, and .lsp.json. The catalog file is .grok-plugin/marketplace.json. Remote sources should pin a git sha.",
    source: "xAI plugin marketplace README",
    href: "https://cdn.jsdelivr.net/gh/xai-org/plugin-marketplace@main/README.md",
    use: "Seven local plugins stay catalog entries. They are not claimed as published marketplace installs.",
  },
  {
    id: "B3-03",
    claim: "Grok loads plugins from ./.grok/plugins, ~/.grok/plugins, marketplace installs, config paths, and --plugin-dir. It also reads Claude Code plugins and AGENTS.md without extra setup. /marketplace is empty until a source is configured.",
    source: "METAGROK skills and marketplace notes, Oct 2026",
    href: "https://metagrok.io/how-to/use-skills-and-plugins-in-grok-build",
    use: "Do not treat a folder on disk as installed until grok plugin list shows it.",
  },
  {
    id: "B3-04",
    claim: "Creating a Vercel project requires Owner, Member, or the Create Project permission. A 403 on create is a role problem. Deployment Protection also returns 403 to agents unless a bypass secret is sent.",
    source: "Vercel managing projects + automated agent access",
    href: "https://vercel.com/docs/projects/managing-projects",
    use: "Reuse an existing project name for file deploys. Do not loop on create_project after a 403.",
  },
  {
    id: "B3-05",
    claim: "ClawHub is OpenClaw's public registry for SKILL.md bundles and plugins, with vector search and pinable installs. It is a different product from Grok's marketplace.",
    source: "openclaw/clawhub README",
    href: "https://github.com/openclaw/clawhub",
    use: "Search ClawHub for ideas. Install into Grok only through a Grok marketplace source.",
  },
  {
    id: "B3-06",
    claim: "superagent-ai/grok-cli is a community Bun + OpenTUI agent with default sub-agents, Telegram remote pair, and a macOS computer sub-agent. It is not xAI Grok Build.",
    source: "superagent-ai/grok-cli README",
    href: "https://github.com/superagent-ai/grok-cli",
    use: "Keep config paths separate. Do not copy ~/.grok from one project into the other.",
  },
  {
    id: "B3-07",
    claim: "xAI Grok Build is a Rust agent runtime: TUI, grok -p headless, and ACP, with skills, plugins, hooks, MCP, and worktrees on one runtime.",
    source: "OSS Tanbou review of xai-org grok-build, Nov 2026",
    href: "https://oss-tanbou.dev/en/oss/xai-org-grok-build",
    use: "Activation plans target this runtime, not the community CLI.",
  },
];

export const cycles = [
  { n: 1, note: "Inventory of installed SKILL.md names. No purposes yet." },
  { n: 2, note: "Plugins scaffolded. Atoms were names only." },
  { n: 3, note: "Encyclopedia copy mirrored. Session rewrite stopped dict-as-key crashes." },
  { n: 4, note: "Static console and a local API. Production static host could not reach the sandbox API." },
  { n: 5, note: "Batch 3 split Grok Build, community grok-cli, and ClawHub. Live skills gained a purpose line. HTTP routes live in the app." },
  { n: 6, note: "Full inventory tree (381 nodes). Selector exports atlas.deploymentPackage.v1 for any implementer LLM. /tree + /selector + /api/inventory + /api/package." },
];

export const sessionSnapshot = {
  service: "atlas-command",
  cycle: 6,
  skills_live: skills.length,
  inventory_skills: 295,
  plugins: plugins.length,
  archivist_batch: 3,
  fuse: "Canonical tree is the encyclopedia plus this app. Ghost entries are not re-read.",
  generated_from: "Cycle 6 full inventory + selector package schema",
  inventory_nodes: 381,
};

export function skillById(id: string) {
  return skills.find((s) => s.id === id) ?? null;
}

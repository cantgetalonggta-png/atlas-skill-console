import data from "./inventory-data.json";

export type InventoryKind =
  | "skill"
  | "plugin"
  | "tool"
  | "connector"
  | "mode"
  | "service"
  | "artifact";

export type InventoryStatus =
  | "live"
  | "workspace"
  | "inventory"
  | "plugin"
  | "tool"
  | "connector"
  | "mode"
  | "service"
  | "artifact";

export type InventoryItem = {
  kind: InventoryKind;
  id: string;
  name: string;
  layer: string;
  layerLabel: string;
  purpose: string;
  status: InventoryStatus;
  group: string;
  meta?: Record<string, unknown>;
};

export type InventoryPreset = {
  id: string;
  name: string;
  description: string;
  select: string[];
};

export type InventoryPayload = {
  generated_at: string;
  cycle: number;
  service: string;
  stats: {
    total: number;
    byKind: Record<string, number>;
    byStatus: Record<string, number>;
  };
  items: InventoryItem[];
  tree: Record<string, Record<string, { id: string; name: string; status: string; purpose: string }[]>>;
  presets: InventoryPreset[];
  liveSkillIds: string[];
  workspaceSkillIds: string[];
};

export const inventory = data as InventoryPayload;

export const inventoryItems = inventory.items;
export const inventoryTree = inventory.tree;
export const inventoryPresets = inventory.presets;
export const inventoryStats = inventory.stats;

export function itemById(id: string) {
  return inventoryItems.find((i) => i.id === id) ?? null;
}

export function itemsByIds(ids: string[]) {
  const set = new Set(ids);
  return inventoryItems.filter((i) => set.has(i.id));
}

export type DeploymentPackage = {
  schema: "atlas.deploymentPackage.v1";
  generated_at: string;
  name: string;
  description: string;
  implementer: {
    summary: string;
    rules: string[];
    steps: string[];
  };
  selection: {
    ids: string[];
    counts: Record<string, number>;
  };
  modules: {
    skills_live: string[];
    skills_workspace: string[];
    skills_inventory: string[];
    plugins: string[];
    tools: string[];
    connectors: string[];
    modes: string[];
    services: string[];
    artifacts: string[];
  };
  items: Array<{
    id: string;
    kind: string;
    name: string;
    layer: string;
    purpose: string;
    status: string;
    implement: string;
  }>;
  routes: string[];
  verification: string[];
};

export function buildDeploymentPackage(
  ids: string[],
  opts?: { name?: string; description?: string },
): DeploymentPackage {
  const selected = itemsByIds(ids);
  const counts: Record<string, number> = {};
  for (const it of selected) {
    counts[it.kind] = (counts[it.kind] ?? 0) + 1;
  }
  const by = (kind: InventoryKind, status?: string) =>
    selected
      .filter((i) => i.kind === kind && (!status || i.status === status))
      .map((i) => i.name);

  const implementLine = (i: InventoryItem) => {
    switch (i.kind) {
      case "skill":
        return i.status === "live"
          ? `Load SKILL.md for \`${i.name}\` from server-skills; wire triggers: ${(i.meta as { triggers?: string })?.triggers ?? "see purpose"}.`
          : i.status === "workspace"
            ? `Use workspace skill \`${i.name}\` under .grok/skills; follow its SKILL.md before UI work.`
            : `Inventory only: do not claim installed. Research or install \`${i.name}\` before invoking.`;
      case "plugin":
        return `Treat as local plugin pack \`${i.name}\`; catalog entry, not marketplace install unless grok plugin list confirms.`;
      case "tool":
        return `Call tool \`${i.name}\` only when the next fact or action requires it; log inputs/outputs.`;
      case "connector":
        return `Use connected service \`${i.name}\` via search_connected_tools then call_connected_tool; never invent auth.`;
      case "mode":
        return `Enter mode \`${i.name}\`: ${i.purpose}`;
      case "service":
        return `Expose or call HTTP surface \`${i.name}\` with JSON, no-store cache.`;
      case "artifact":
        return `Read artifact \`${i.name}\` from encyclopedia/dirs; cite path in handoff.`;
      default:
        return i.purpose;
    }
  };

  return {
    schema: "atlas.deploymentPackage.v1",
    generated_at: new Date().toISOString(),
    name: opts?.name ?? "atlas-selection",
    description:
      opts?.description ??
      "Structured selection of skills, tools, modes, and services for an implementer LLM.",
    implementer: {
      summary:
        "Implement only what is selected. Do not invent installs. Live skills are available; inventory skills need install or research first. Prefer existing Atlas routes for verification.",
      rules: [
        "Never claim a skill is installed unless status is live or workspace.",
        "Plugins are local catalog packs until grok plugin install succeeds.",
        "Connectors require the user's linked account; use search_connected_tools first.",
        "HTTP services listed must return JSON; UI must call them with working buttons.",
        "Export this package as the source of truth for the build tranche.",
        "Auth stays off unless the product ask names accounts/login/per-user data.",
      ],
      steps: [
        "1. Read selection.modules and items[].implement.",
        "2. Scaffold or extend the Atlas routes needed by selected services.",
        "3. Wire UI selectors/pins for selected skills and plugins.",
        "4. Run typecheck, build, browser-smoke, agent-browser on critical buttons.",
        "5. Write encyclopedia note of what was selected and verified.",
      ],
    },
    selection: { ids: [...ids], counts },
    modules: {
      skills_live: by("skill", "live"),
      skills_workspace: by("skill", "workspace"),
      skills_inventory: by("skill", "inventory"),
      plugins: by("plugin"),
      tools: by("tool"),
      connectors: by("connector"),
      modes: by("mode"),
      services: by("service"),
      artifacts: by("artifact"),
    },
    items: selected.map((i) => ({
      id: i.id,
      kind: i.kind,
      name: i.name,
      layer: i.layerLabel,
      purpose: i.purpose,
      status: i.status,
      implement: implementLine(i),
    })),
    routes: [
      "GET /health",
      "GET /api/skills",
      "GET /api/plugins",
      "GET /api/session",
      "GET /api/archivist",
      "GET /api/inventory",
      "POST /api/package",
      "/ (overview)",
      "/skills",
      "/plugins",
      "/tree",
      "/selector",
      "/archivist",
      "/engine",
      "/services",
      "/deploy",
    ],
    verification: [
      "curl /health returns ok and skill counts",
      "curl /api/inventory returns total matching selection universe",
      "POST /api/package with body {ids:[...]} returns schema atlas.deploymentPackage.v1",
      "Selector page toggles, presets, copy package, download package",
      "npm run typecheck && npm run build",
      "browser-smoke clean console; agent-browser filter + service probe",
    ],
  };
}

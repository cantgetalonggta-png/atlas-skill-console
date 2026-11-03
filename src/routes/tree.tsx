import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell, PageTitle } from "@/components/shell";
import { inventory, inventoryItems, inventoryStats } from "@/lib/inventory";

export const Route = createFileRoute("/tree")({ component: TreePage });

const kinds = ["skill", "plugin", "tool", "connector", "mode", "service", "artifact"] as const;

function TreePage() {
  const [kind, setKind] = useState<(typeof kinds)[number] | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return inventoryItems.filter((i) => {
      if (kind !== "all" && i.kind !== kind) return false;
      if (!needle) return true;
      return (
        i.id.toLowerCase().includes(needle) ||
        i.name.toLowerCase().includes(needle) ||
        i.purpose.toLowerCase().includes(needle) ||
        i.layerLabel.toLowerCase().includes(needle)
      );
    });
  }, [kind, q]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const i of filtered) {
      const key = `${i.kind} · ${i.layerLabel}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(i);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <Shell>
      <PageTitle
        kicker="Ontology"
        title="Full functional tree"
        lede={`Every skill, tool, mode, plugin, service, connector, and artifact distilled into one ledger. ${inventoryStats.total} nodes · cycle ${inventory.cycle}.`}
      />

      <section className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(inventoryStats.byKind).map(([k, n]) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k as (typeof kinds)[number])}
            className={
              "rounded-xl border px-4 py-3 text-left " +
              (kind === k ? "border-brass bg-surface" : "border-line bg-surface")
            }
          >
            <p className="font-serif text-2xl text-brass">{n}</p>
            <p className="text-sm text-muted">{k}</p>
          </button>
        ))}
      </section>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tree"
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-brass sm:max-w-md"
        />
        <button
          type="button"
          onClick={() => setKind("all")}
          className="rounded-full border border-line px-4 py-2 text-sm"
        >
          All kinds
        </button>
        <p className="text-sm text-muted">
          {filtered.length} shown ·{" "}
          <Link to="/selector" className="text-brass">
            open selector
          </Link>
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {grouped.map(([label, rows]) => (
          <section key={label} className="rounded-xl border border-line bg-surface p-4">
            <h2 className="font-serif text-xl">
              {label} <span className="text-sm text-muted">({rows.length})</span>
            </h2>
            <ul className="mt-3 divide-y divide-line">
              {rows.map((r) => (
                <li key={r.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-muted">{r.id} · {r.status}</p>
                    <p className="mt-1 text-sm text-muted">{r.purpose}</p>
                  </div>
                  <Link
                    to="/selector"
                    className="shrink-0 text-sm text-brass"
                    
                  >
                    Select
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Shell>
  );
}

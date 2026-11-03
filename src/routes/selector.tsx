import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell, PageTitle } from "@/components/shell";
import {
  buildDeploymentPackage,
  inventoryItems,
  inventoryPresets,
  inventoryStats,
  type InventoryKind,
} from "@/lib/inventory";
import { useSelection } from "@/lib/selection";

export const Route = createFileRoute("/selector")({ component: SelectorPage });

const kinds: InventoryKind[] = ["skill", "plugin", "tool", "connector", "mode", "service", "artifact"];

function SelectorPage() {
  const selected = useSelection((s) => s.selected);
  const toggle = useSelection((s) => s.toggle);
  const setMany = useSelection((s) => s.setMany);
  const clear = useSelection((s) => s.clear);
  const applyPreset = useSelection((s) => s.applyPreset);
  const packageName = useSelection((s) => s.packageName);
  const packageDescription = useSelection((s) => s.packageDescription);
  const setPackageMeta = useSelection((s) => s.setPackageMeta);

  const [kind, setKind] = useState<InventoryKind | "all">("skill");
  const [status, setStatus] = useState<string>("live");
  const [q, setQ] = useState("");
  const [note, setNote] = useState("");
  const [exportBody, setExportBody] = useState("");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return inventoryItems.filter((i) => {
      if (kind !== "all" && i.kind !== kind) return false;
      if (status !== "all" && i.status !== status) return false;
      if (!needle) return true;
      return (
        i.name.toLowerCase().includes(needle) ||
        i.id.toLowerCase().includes(needle) ||
        i.purpose.toLowerCase().includes(needle)
      );
    });
  }, [kind, status, q]);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  function buildPkg() {
    const pkg = buildDeploymentPackage(selected, {
      name: packageName,
      description: packageDescription,
    });
    const text = JSON.stringify(pkg, null, 2);
    setExportBody(text);
    return text;
  }

  async function copyPkg() {
    const text = buildPkg();
    await navigator.clipboard.writeText(text);
    setNote(`Copied package (${selected.length} items).`);
  }

  function downloadPkg() {
    const text = buildPkg();
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${packageName || "atlas-selection"}.deployment.json`;
    a.click();
    URL.revokeObjectURL(url);
    setNote(`Downloaded ${packageName}.deployment.json`);
  }

  async function postPkg() {
    const res = await fetch("/api/package", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ids: selected,
        name: packageName,
        description: packageDescription,
      }),
    });
    const data = await res.json();
    setExportBody(JSON.stringify(data, null, 2));
    setNote(`POST /api/package → ${res.status}`);
  }

  function selectVisible() {
    setMany(
      list.map((i) => i.id),
      "add",
    );
  }

  return (
    <Shell>
      <PageTitle
        kicker="Deploy builder"
        title="Select anything"
        lede="Toggle individual skills, tools, modes, plugins, services, connectors, and artifacts. Export a structured package any implementer LLM can run."
      />

      <section className="grid gap-4 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <div className="flex flex-wrap gap-2">
            {inventoryPresets.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p.id)}
                className="rounded-full border border-line px-3 py-2 text-sm hover:border-brass"
                title={p.description}
              >
                {p.name}
              </button>
            ))}
            <button type="button" onClick={clear} className="rounded-full border border-line px-3 py-2 text-sm text-muted">
              Clear
            </button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as InventoryKind | "all")}
              className="rounded-xl border border-line bg-surface px-3 py-2 text-sm"
            >
              <option value="all">All kinds</option>
              {kinds.map((k) => (
                <option key={k} value={k}>
                  {k} ({inventoryStats.byKind[k] ?? 0})
                </option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl border border-line bg-surface px-3 py-2 text-sm"
            >
              <option value="all">All statuses</option>
              {Object.keys(inventoryStats.byStatus).map((s) => (
                <option key={s} value={s}>
                  {s} ({inventoryStats.byStatus[s]})
                </option>
              ))}
            </select>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter list"
              className="flex-1 rounded-xl border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-brass"
            />
            <button type="button" onClick={selectVisible} className="rounded-full bg-brass px-4 py-2 text-sm font-medium text-brass-ink">
              Select visible
            </button>
          </div>

          <ul className="max-h-[32rem] space-y-1 overflow-y-auto rounded-xl border border-line bg-surface p-2">
            {list.length === 0 ? (
              <li className="px-3 py-6 text-sm text-muted">No matches.</li>
            ) : (
              list.map((i) => {
                const on = selectedSet.has(i.id);
                return (
                  <li key={i.id}>
                    <button
                      type="button"
                      onClick={() => toggle(i.id)}
                      className={
                        "flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left " +
                        (on ? "bg-surface-2" : "hover:bg-surface-2")
                      }
                    >
                      <span
                        className={
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border text-xs " +
                          (on ? "border-brass bg-brass text-brass-ink" : "border-line text-muted")
                        }
                        aria-hidden
                      >
                        {on ? "✓" : ""}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{i.name}</span>
                        <span className="block text-xs text-muted">
                          {i.kind} · {i.status} · {i.layerLabel}
                        </span>
                        <span className="mt-1 block text-xs text-muted">{i.purpose}</span>
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>

        <aside className="space-y-4 lg:col-span-2">
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="text-xs tracking-widest text-brass uppercase">Selection</p>
            <p className="mt-2 font-serif text-3xl text-brass">{selected.length}</p>
            <p className="text-sm text-muted">of {inventoryStats.total} nodes</p>
            <label className="mt-4 block text-xs text-muted">
              Package name
              <input
                value={packageName}
                onChange={(e) => setPackageMeta(e.target.value, packageDescription)}
                className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm"
              />
            </label>
            <label className="mt-3 block text-xs text-muted">
              Description
              <textarea
                value={packageDescription}
                onChange={(e) => setPackageMeta(packageName, e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm"
              />
            </label>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={copyPkg} className="rounded-full bg-brass px-4 py-2 text-sm font-medium text-brass-ink">
                Copy LLM package
              </button>
              <button type="button" onClick={downloadPkg} className="rounded-full border border-line px-4 py-2 text-sm">
                Download JSON
              </button>
              <button type="button" onClick={postPkg} className="rounded-full border border-line px-4 py-2 text-sm">
                POST /api/package
              </button>
              <button type="button" onClick={buildPkg} className="rounded-full border border-line px-4 py-2 text-sm">
                Preview
              </button>
            </div>
            {note ? <p className="mt-3 text-sm text-ok">{note}</p> : null}
          </div>

          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="text-sm font-medium">Selected ids</p>
            <ul className="mt-2 max-h-40 overflow-y-auto text-xs text-muted">
              {selected.length === 0 ? (
                <li>None — load a preset or toggle items.</li>
              ) : (
                selected.map((id) => <li key={id}>{id}</li>)
              )}
            </ul>
          </div>
        </aside>
      </section>

      {exportBody ? (
        <section className="mt-6">
          <h2 className="font-serif text-2xl">Deployment package</h2>
          <pre className="mt-3 max-h-[28rem] overflow-auto rounded-xl border border-line bg-surface p-4 text-xs leading-relaxed">
            {exportBody}
          </pre>
        </section>
      ) : null}
    </Shell>
  );
}

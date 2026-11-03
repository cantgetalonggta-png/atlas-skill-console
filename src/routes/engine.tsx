import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, PageTitle } from "@/components/shell";
import { cycles, sessionSnapshot } from "@/lib/catalog";
import { inventoryStats } from "@/lib/inventory";

export const Route = createFileRoute("/engine")({ component: EnginePage });

function EnginePage() {
  return (
    <Shell>
      <PageTitle
        kicker="Skill tree"
        title={`Cycle ${sessionSnapshot.cycle}`}
        lede="Discovery, representation, retrieval, evolution. Cycle 6 published the full functional tree and the selector package schema."
      />
      <ol className="space-y-3">
        {cycles.map((c) => (
          <li key={c.n} className="grid gap-3 rounded-xl border border-line bg-surface p-4 sm:grid-cols-[5rem_1fr]">
            <p className="font-serif text-2xl text-brass">{c.n}</p>
            <p className={c.n === sessionSnapshot.cycle ? "text-fg" : "text-muted"}>{c.note}</p>
          </li>
        ))}
      </ol>
      <section className="mt-8 rounded-xl border border-line bg-surface p-5">
        <h2 className="font-serif text-2xl">Cycle 6 deliverables</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
          <li>{inventoryStats.total} inventory nodes across skills, tools, modes, plugins, services, connectors, artifacts.</li>
          <li>Tree desk: filter by kind and search every node.</li>
          <li>Selector desk: presets, multi-select, copy/download/POST package.</li>
          <li>Schema <code>atlas.deploymentPackage.v1</code> with implementer rules and per-item implement lines.</li>
        </ul>
        <Link to="/selector" className="mt-4 inline-block text-sm text-brass">
          Open selector →
        </Link>
      </section>
    </Shell>
  );
}

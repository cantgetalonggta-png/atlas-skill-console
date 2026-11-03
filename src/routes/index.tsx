import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, PageTitle } from "@/components/shell";
import { inventoryLayers, plugins, sessionSnapshot, skills } from "@/lib/catalog";
import { inventoryStats } from "@/lib/inventory";
import { usePins } from "@/lib/pins";
import { useSelection } from "@/lib/selection";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const pins = usePins((s) => s.skills);
  const selected = useSelection((s) => s.selected);

  return (
    <Shell>
      <PageTitle
        kicker="Command surface"
        title="Atlas skill ledger"
        lede="Live skills, full ontology tree, and a selector that exports LLM-ready deployment packages. Every button talks to a real route."
      />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Stat n={String(skills.length)} label="Live skills" />
        <Stat n={String(inventoryStats.total)} label="Inventory nodes" />
        <Stat n={String(plugins.length)} label="Plugin packs" />
        <Stat n={String(selected.length)} label="In selector" />
        <Stat n={`Cycle ${sessionSnapshot.cycle}`} label="Skill engine" />
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-5">
        <div className="rounded-xl border border-line bg-surface p-5 lg:col-span-3">
          <h2 className="font-serif text-2xl">Open a desk</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Desk to="/skills" title="Skills" text="Search live skills, pin, copy slug." />
            <Desk to="/tree" title="Full tree" text="All 381 skills, tools, modes, artifacts." />
            <Desk to="/selector" title="Selector" text="Pick anything. Export atlas.deploymentPackage.v1." />
            <Desk to="/plugins" title="Plugins" text="Seven local packs and their skill members." />
            <Desk to="/archivist" title="Archivist batch 3" text="Sourced claims. Products stay separated." />
            <Desk to="/services" title="Services" text="Probe every HTTP route from the page." />
          </div>
        </div>
        <div className="rounded-xl border border-line bg-surface p-5 lg:col-span-2">
          <h2 className="font-serif text-2xl">Pinned skills</h2>
          {pins.length === 0 ? (
            <p className="mt-3 text-sm text-muted">None yet. Pin from Skills.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {pins.map((id) => (
                <li key={id}>
                  <Link to="/skills" className="text-sm text-brass">
                    {id}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <h2 className="mt-6 font-serif text-xl">Selector draft</h2>
          <p className="mt-2 text-sm text-muted">{selected.length} items staged for package export.</p>
          <Link to="/selector" className="mt-3 inline-block text-sm text-brass">
            Build package →
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl">Master inventory layers</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Counts from MASTER_SKILLS. Live set is the fifty installed packages; the tree and selector include inventory-only names without claiming they are installed.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {inventoryLayers.map((row) => (
            <li key={row.layer} className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3">
              <span className="text-sm">{row.layer}</span>
              <span className="font-serif text-lg text-brass">{row.count}</span>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-4">
      <p className="font-serif text-3xl text-brass">{n}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

function Desk({
  to,
  title,
  text,
}: {
  to: "/" | "/skills" | "/plugins" | "/archivist" | "/services" | "/tree" | "/selector";
  title: string;
  text: string;
}) {
  return (
    <Link to={to} className="rounded-xl border border-line bg-surface-2 px-4 py-4 hover:border-brass">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted">{text}</p>
    </Link>
  );
}

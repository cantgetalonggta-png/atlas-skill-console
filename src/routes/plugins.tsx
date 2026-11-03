import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, PageTitle } from "@/components/shell";
import { plugins, skills } from "@/lib/catalog";
import { usePins } from "@/lib/pins";

export const Route = createFileRoute("/plugins")({ component: PluginsPage });

function PluginsPage() {
  const [open, setOpen] = useState(plugins[0].name);
  const pinned = usePins((s) => s.plugins);
  const toggle = usePins((s) => s.togglePlugin);
  const pack = plugins.find((p) => p.name === open) ?? plugins[0];
  const members = skills.filter((s) => s.plugin === pack.name);

  return (
    <Shell>
      <PageTitle
        kicker="Marketplace draft"
        title="Plugin packs"
        lede="Local packs for this workspace. They are catalogued, not published. A Grok install still needs a marketplace source and grok plugin install."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {plugins.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setOpen(p.name)}
            className={
              "rounded-xl border p-4 text-left " +
              (open === p.name ? "border-brass bg-surface" : "border-line bg-surface hover:border-brass")
            }
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-medium">{p.name}</h2>
              <span className="text-xs text-muted">{p.version}</span>
            </div>
            <p className="mt-1 text-xs tracking-wide text-brass uppercase">{p.category}</p>
            <p className="mt-2 text-sm text-muted">{p.description}</p>
          </button>
        ))}
      </div>

      <section className="mt-6 rounded-xl border border-line bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-2xl">{pack.name}</h2>
          <button
            type="button"
            onClick={() => toggle(pack.name)}
            className="rounded-full bg-brass px-4 py-2 text-sm font-medium text-brass-ink"
          >
            {pinned.includes(pack.name) ? "Pinned" : "Pin pack"}
          </button>
        </div>
        <p className="mt-2 text-sm text-muted">Parts: {pack.parts.join(" · ")}</p>
        <p className="mt-1 text-sm text-muted">Keywords: {pack.keywords.join(", ")}</p>
        <h3 className="mt-6 text-sm font-medium">Skills in this pack</h3>
        {members.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No live skill points here.</p>
        ) : (
          <ul className="mt-2 grid gap-1 sm:grid-cols-2">
            {members.map((s) => (
              <li key={s.id} className="rounded-lg bg-surface-2 px-3 py-2 text-sm">
                {s.id}
              </li>
            ))}
          </ul>
        )}
      </section>
    </Shell>
  );
}

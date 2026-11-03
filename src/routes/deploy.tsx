import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, PageTitle } from "@/components/shell";
import { inventoryStats } from "@/lib/inventory";

export const Route = createFileRoute("/deploy")({ component: DeployPage });

const links = [
  {
    label: "GitHub mirror of the earlier static console",
    href: "https://github.com/cantgetalonggta-png/etc-console",
  },
  {
    label: "Earlier Vercel file deploy",
    href: "https://etc-skills-console.vercel.app",
  },
];

function DeployPage() {
  const [note, setNote] = useState("");

  async function copyPublish() {
    const text =
      "Publish Atlas from Grok preview. Includes /tree, /selector, atlas.deploymentPackage.v1, /api/inventory, /api/package.";
    await navigator.clipboard.writeText(text);
    setNote("Copied publish note.");
  }

  return (
    <Shell>
      <PageTitle
        kicker="Ship"
        title="What is actually deployed"
        lede="This preview is the working app. Publishing it from Grok ships the tree, selector, and package APIs. The older static site cannot serve those routes."
      />

      <section className="rounded-xl border border-line bg-surface p-5">
        <h2 className="font-serif text-2xl">This app (cycle 6)</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>{inventoryStats.total} inventory nodes distilled into Tree + Selector.</li>
          <li>Desks: Overview, Skills, Tree, Selector, Plugins, Archivist, Engine, Services, Deploy.</li>
          <li>
            HTTP: /health, /api/skills, /api/plugins, /api/session, /api/archivist, /api/inventory, /api/package
            (GET+POST).
          </li>
          <li>Export schema: atlas.deploymentPackage.v1 — implementer rules, modules, per-item implement lines.</li>
          <li>Pins and selection stay in this browser only.</li>
        </ul>
        <button
          type="button"
          onClick={copyPublish}
          className="mt-5 rounded-full bg-brass px-4 py-2 text-sm font-medium text-brass-ink"
        >
          Copy publish note
        </button>
        {note ? <p className="mt-3 text-sm text-ok">{note}</p> : null}
      </section>

      <section className="mt-4 rounded-xl border border-line bg-surface p-5">
        <h2 className="font-serif text-2xl">Earlier surfaces</h2>
        <ul className="mt-3 space-y-3">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer" className="text-brass">
                {l.label}
              </a>
              <p className="text-sm text-muted">{l.href}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          Creating a brand-new Vercel project may 403 on team role. Reuse an existing project or publish this Grok app.
          That is a permission limit, not a broken build.
        </p>
      </section>
    </Shell>
  );
}

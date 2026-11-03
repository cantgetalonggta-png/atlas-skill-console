import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, PageTitle } from "@/components/shell";
import { archivistBatch3 } from "@/lib/catalog";

export const Route = createFileRoute("/archivist")({ component: ArchivistPage });

function ArchivistPage() {
  const [open, setOpen] = useState(archivistBatch3[0].id);
  const row = archivistBatch3.find((f) => f.id === open) ?? archivistBatch3[0];

  return (
    <Shell>
      <PageTitle
        kicker="Batch 3"
        title="What the searches actually said"
        lede="Seven claims, each tied to a page. If a later run contradicts one, replace the row. Do not average them."
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <ul className="space-y-1 lg:col-span-2">
          {archivistBatch3.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => setOpen(f.id)}
                className={
                  "w-full rounded-xl border px-3 py-3 text-left " +
                  (open === f.id ? "border-brass bg-surface" : "border-line bg-surface")
                }
              >
                <span className="text-xs text-brass">{f.id}</span>
                <span className="mt-1 block text-sm">{f.source}</span>
              </button>
            </li>
          ))}
        </ul>
        <article className="rounded-xl border border-line bg-surface p-5 lg:col-span-3">
          <p className="text-xs tracking-widest text-brass uppercase">{row.id}</p>
          <h2 className="mt-2 font-serif text-2xl">{row.source}</h2>
          <p className="mt-4">{row.claim}</p>
          <p className="mt-4 text-sm text-muted">Use: {row.use}</p>
          <a
            href={row.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block text-sm text-brass"
          >
            Open source
          </a>
        </article>
      </div>
    </Shell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell, PageTitle } from "@/components/shell";
import { layers, skills, type Layer, type Skill } from "@/lib/catalog";
import { usePins } from "@/lib/pins";

export const Route = createFileRoute("/skills")({ component: SkillsPage });

function SkillsPage() {
  const [q, setQ] = useState("");
  const [layer, setLayer] = useState<Layer | "all">("all");
  const [current, setCurrent] = useState<Skill>(skills[0]);
  const [copied, setCopied] = useState(false);
  const pins = usePins((s) => s.skills);
  const toggle = usePins((s) => s.toggleSkill);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return skills.filter((s) => {
      if (layer !== "all" && s.layer !== layer) return false;
      if (!needle) return true;
      return (
        s.id.includes(needle) ||
        s.purpose.toLowerCase().includes(needle) ||
        s.triggers.toLowerCase().includes(needle)
      );
    });
  }, [q, layer]);

  const shown = list.some((s) => s.id === current.id) ? current : (list[0] ?? null);

  async function copySlug() {
    if (!shown) return;
    await navigator.clipboard.writeText(shown.id);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <Shell>
      <PageTitle
        kicker="Catalog"
        title="Live skills"
        lede="Each row is an installed skill with the job it is allowed to do. Search matches the slug, the purpose, and the triggers."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="skill-search">
          Search skills
        </label>
        <input
          id="skill-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search slug, purpose, trigger"
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-fg outline-none placeholder:text-muted focus:border-brass sm:max-w-md"
        />
        <p className="text-sm text-muted">
          {list.length} of {skills.length}
        </p>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        <Chip on={layer === "all"} onClick={() => setLayer("all")}>
          All
        </Chip>
        {layers.map((l) => (
          <Chip key={l.id} on={layer === l.id} onClick={() => setLayer(l.id)}>
            {l.label}
          </Chip>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <ul className="max-h-[32rem] space-y-1 overflow-y-auto rounded-xl border border-line bg-surface p-2 lg:col-span-2">
          {list.length === 0 ? (
            <li className="px-3 py-6 text-sm text-muted">No skill matches that filter.</li>
          ) : (
            list.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setCurrent(s)}
                  className={
                    "w-full rounded-lg px-3 py-2 text-left " +
                    (shown?.id === s.id ? "bg-surface-2" : "hover:bg-surface-2")
                  }
                >
                  <span className="block text-sm">{s.id}</span>
                  <span className="block text-xs text-muted">{s.layer}</span>
                </button>
              </li>
            ))
          )}
        </ul>

        <article className="rounded-xl border border-line bg-surface p-5 lg:col-span-3">
          {shown ? (
            <>
              <p className="text-xs tracking-widest text-brass uppercase">{shown.layer}</p>
              <h2 className="mt-2 font-serif text-3xl">{shown.id}</h2>
              <p className="mt-4 text-fg">{shown.purpose}</p>
              <dl className="mt-6 space-y-3 text-sm">
                <div>
                  <dt className="text-muted">Triggers</dt>
                  <dd>{shown.triggers}</dd>
                </div>
                <div>
                  <dt className="text-muted">Plugin pack</dt>
                  <dd>{shown.plugin}</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copySlug}
                  className="rounded-full bg-brass px-4 py-2 text-sm font-medium text-brass-ink"
                >
                  {copied ? "Copied" : "Copy slug"}
                </button>
                <button
                  type="button"
                  onClick={() => toggle(shown.id)}
                  className="rounded-full border border-line px-4 py-2 text-sm"
                >
                  {pins.includes(shown.id) ? "Unpin" : "Pin on this device"}
                </button>
              </div>
            </>
          ) : (
            <p className="text-muted">No skill matches that filter.</p>
          )}
        </article>
      </div>
    </Shell>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "shrink-0 rounded-full border px-3 py-2 text-sm " +
        (on ? "border-brass bg-brass text-brass-ink" : "border-line text-muted")
      }
    >
      {children}
    </button>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, PageTitle } from "@/components/shell";

export const Route = createFileRoute("/services")({ component: ServicesPage });

const routes = [
  { method: "GET", path: "/health" },
  { method: "GET", path: "/api/skills" },
  { method: "GET", path: "/api/plugins" },
  { method: "GET", path: "/api/session" },
  { method: "GET", path: "/api/archivist" },
  { method: "GET", path: "/api/inventory" },
  { method: "GET", path: "/api/package" },
  { method: "POST", path: "/api/package", body: { ids: ["agent-orchestration", "plugin:core-infrastructure", "mode:archivist"], name: "smoke-package" } },
];

function ServicesPage() {
  const [active, setActive] = useState(routes[0].path + routes[0].method);
  const [body, setBody] = useState("Choose a route. Responses are live JSON from this app.");
  const [status, setStatus] = useState<string>("idle");
  const [busy, setBusy] = useState(false);

  async function call(r: (typeof routes)[number]) {
    const key = r.path + r.method;
    setActive(key);
    setBusy(true);
    setStatus("loading");
    try {
      const res = await fetch(r.path, {
        method: r.method,
        headers: r.method === "POST" ? { "Content-Type": "application/json" } : undefined,
        body: r.method === "POST" ? JSON.stringify(r.body) : undefined,
      });
      const text = await res.text();
      let pretty = text;
      try {
        pretty = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        /* raw */
      }
      setBody(pretty);
      setStatus(`${res.status} ${res.ok ? "ok" : "error"}`);
    } catch (err) {
      setStatus("failed");
      setBody(err instanceof Error ? err.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      <PageTitle
        kicker="HTTP"
        title="Service routes"
        lede="Every button hits this app. Inventory and package routes ship the full tree and the LLM deployment schema."
      />
      <div className="flex flex-wrap gap-2">
        {routes.map((r) => {
          const key = r.path + r.method;
          return (
            <button
              key={key}
              type="button"
              disabled={busy}
              onClick={() => call(r)}
              className={
                "rounded-full border px-4 py-2 text-sm disabled:opacity-60 " +
                (active === key ? "border-brass bg-brass text-brass-ink" : "border-line")
              }
            >
              {r.method} {r.path}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-ok">{status}</p>
      <pre className="mt-3 max-h-[28rem] overflow-auto rounded-xl border border-line bg-surface p-4 text-xs leading-relaxed text-fg">
        {body}
      </pre>
    </Shell>
  );
}

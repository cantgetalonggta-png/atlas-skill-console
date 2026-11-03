import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const links = [
  { to: "/", label: "Overview" },
  { to: "/skills", label: "Skills" },
  { to: "/tree", label: "Tree" },
  { to: "/selector", label: "Selector" },
  { to: "/plugins", label: "Plugins" },
  { to: "/archivist", label: "Archivist" },
  { to: "/engine", label: "Engine" },
  { to: "/services", label: "Services" },
  { to: "/deploy", label: "Deploy" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <Link to="/" className="shrink-0 font-serif text-2xl tracking-tight text-brass">
            Atlas
          </Link>
          <nav className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
            {links.map((l) => {
              const on = l.to === "/" ? path === "/" : path.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={
                    "shrink-0 rounded-full px-3 py-2 text-sm " +
                    (on ? "bg-surface-2 text-fg" : "text-muted hover:text-fg")
                  }
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}

export function PageTitle({ kicker, title, lede }: { kicker: string; title: string; lede: string }) {
  return (
    <header className="mb-8 max-w-3xl">
      <p className="text-xs font-medium tracking-widest text-brass uppercase">{kicker}</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight text-fg">{title}</h1>
      <p className="mt-3 text-muted">{lede}</p>
    </header>
  );
}

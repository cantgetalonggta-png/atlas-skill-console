import { createFileRoute } from "@tanstack/react-router";
import { plugins, sessionSnapshot, skills } from "@/lib/catalog";
import { json } from "@/lib/http";

export const Route = createFileRoute("/health")({
  server: {
    handlers: {
      GET: async () =>
        json({
          ok: true,
          service: sessionSnapshot.service,
          skills: skills.length,
          plugins: plugins.length,
          cycle: sessionSnapshot.cycle,
        }),
    },
  },
});

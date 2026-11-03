import { createFileRoute } from "@tanstack/react-router";
import { skills } from "@/lib/catalog";
import { json } from "@/lib/http";

export const Route = createFileRoute("/api/skills")({
  server: {
    handlers: {
      GET: async () => json({ count: skills.length, skills }),
    },
  },
});

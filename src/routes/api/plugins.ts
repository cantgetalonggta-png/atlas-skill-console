import { createFileRoute } from "@tanstack/react-router";
import { plugins } from "@/lib/catalog";
import { json } from "@/lib/http";

export const Route = createFileRoute("/api/plugins")({
  server: {
    handlers: {
      GET: async () => json({ count: plugins.length, plugins }),
    },
  },
});

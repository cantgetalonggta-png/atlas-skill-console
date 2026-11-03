import { createFileRoute } from "@tanstack/react-router";
import { sessionSnapshot } from "@/lib/catalog";
import { json } from "@/lib/http";

export const Route = createFileRoute("/api/session")({
  server: {
    handlers: {
      GET: async () => json(sessionSnapshot),
    },
  },
});

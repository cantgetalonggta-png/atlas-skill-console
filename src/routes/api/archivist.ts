import { createFileRoute } from "@tanstack/react-router";
import { archivistBatch3 } from "@/lib/catalog";
import { json } from "@/lib/http";

export const Route = createFileRoute("/api/archivist")({
  server: {
    handlers: {
      GET: async () => json({ batch: 3, count: archivistBatch3.length, findings: archivistBatch3 }),
    },
  },
});

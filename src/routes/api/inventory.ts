import { createFileRoute } from "@tanstack/react-router";
import { inventory } from "@/lib/inventory";
import { json } from "@/lib/http";

export const Route = createFileRoute("/api/inventory")({
  server: {
    handlers: {
      GET: async () =>
        json({
          cycle: inventory.cycle,
          stats: inventory.stats,
          generated_at: inventory.generated_at,
          tree: inventory.tree,
          presets: inventory.presets.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            count: p.select.length,
          })),
          items: inventory.items,
        }),
    },
  },
});

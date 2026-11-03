import { createFileRoute } from "@tanstack/react-router";
import { buildDeploymentPackage } from "@/lib/inventory";
import { json } from "@/lib/http";

export const Route = createFileRoute("/api/package")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { ids?: string[]; name?: string; description?: string } = {};
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return json({ error: "invalid json" }, 400);
        }
        const ids = Array.isArray(body.ids) ? body.ids.filter((x) => typeof x === "string") : [];
        if (ids.length === 0) {
          return json({ error: "ids required (string[])" }, 400);
        }
        const pkg = buildDeploymentPackage(ids, {
          name: body.name,
          description: body.description,
        });
        return json(pkg);
      },
      GET: async () =>
        json({
          schema: "atlas.deploymentPackage.v1",
          usage: "POST { ids: string[], name?, description? }",
          example: { ids: ["agent-orchestration", "plugin:core-infrastructure", "mode:archivist"] },
        }),
    },
  },
});

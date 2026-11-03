import { create } from "zustand";
import { persist } from "zustand/middleware";
import { inventoryPresets } from "./inventory";

type SelectionState = {
  selected: string[];
  packageName: string;
  packageDescription: string;
  toggle: (id: string) => void;
  setMany: (ids: string[], mode?: "replace" | "add" | "remove") => void;
  clear: () => void;
  applyPreset: (presetId: string) => void;
  setPackageMeta: (name: string, description: string) => void;
};

export const useSelection = create<SelectionState>()(
  persist(
    (set, get) => ({
      selected: [],
      packageName: "atlas-selection",
      packageDescription: "Structured deployment selection for an implementer LLM.",
      toggle: (id) => {
        const cur = get().selected;
        set({
          selected: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
        });
      },
      setMany: (ids, mode = "replace") => {
        if (mode === "replace") {
          set({ selected: [...new Set(ids)] });
          return;
        }
        const cur = new Set(get().selected);
        if (mode === "add") ids.forEach((id) => cur.add(id));
        else ids.forEach((id) => cur.delete(id));
        set({ selected: [...cur] });
      },
      clear: () => set({ selected: [] }),
      applyPreset: (presetId) => {
        const p = inventoryPresets.find((x) => x.id === presetId);
        if (!p) return;
        set({
          selected: [...new Set(p.select)],
          packageName: p.id,
          packageDescription: p.description,
        });
      },
      setPackageMeta: (name, description) => set({ packageName: name, packageDescription: description }),
    }),
    { name: "atlas-selection-v1" },
  ),
);

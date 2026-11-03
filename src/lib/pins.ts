import { create } from "zustand";
import { persist } from "zustand/middleware";

type Pins = {
  skills: string[];
  plugins: string[];
  toggleSkill: (id: string) => void;
  togglePlugin: (id: string) => void;
};

export const usePins = create<Pins>()(
  persist(
    (set) => ({
      skills: [],
      plugins: [],
      toggleSkill: (id) =>
        set((s) => ({
          skills: s.skills.includes(id) ? s.skills.filter((x) => x !== id) : [...s.skills, id],
        })),
      togglePlugin: (id) =>
        set((s) => ({
          plugins: s.plugins.includes(id) ? s.plugins.filter((x) => x !== id) : [...s.plugins, id],
        })),
    }),
    { name: "atlas-pins" },
  ),
);

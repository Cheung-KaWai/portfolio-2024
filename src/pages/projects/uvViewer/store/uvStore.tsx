import { mountStoreDevtool } from "simple-zustand-devtools";
import { Mesh } from "three";
import { create } from "zustand";

interface UvViewer {
  geo?: Mesh;
  mesh: string;
  update: (options: Partial<UvViewer>) => void;
}

export const useUvViewer = create<UvViewer>((set) => ({
  mesh: "box",
  update: (options) => set((state) => ({ ...state, ...options })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("uvViewer", useUvViewer);
}

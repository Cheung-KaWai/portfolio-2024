import { mountStoreDevtool } from "simple-zustand-devtools";
import { Mesh } from "three";
import { create } from "zustand";

interface UvViewer {
  geo?: Mesh;
  update: (options: Partial<UvViewer>) => void;
}

export const useUvViewer = create<UvViewer>((set) => ({
  showDebug: null,
  update: (options) => set((state) => ({ ...state, ...options })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("uvViewer", useUvViewer);
}

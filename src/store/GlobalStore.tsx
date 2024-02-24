import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface GlobalState {
  showPerf: boolean;
  update: (options: Partial<GlobalState>) => void;
}

export const useGlobal = create<GlobalState>((set) => ({
  showPerf: process.env.NODE_ENV === "development" ? true : false,
  update: (options) => set((state) => ({ ...state, ...options })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useGlobal);
}

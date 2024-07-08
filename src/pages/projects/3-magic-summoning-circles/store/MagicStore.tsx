import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface MagicState {
  outerCircle: string;
  innerCircle: string;
  centerCircle: string;
  update: (options: Partial<MagicState>) => void;
}

export const useMagicStore = create<MagicState>((set) => ({
  outerCircle: "",
  innerCircle: "",
  centerCircle: "",
  update: (options) => set((state) => ({ ...state, ...options })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("magicStore", useMagicStore);
}

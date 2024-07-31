import { Mesh } from "three";
import { create } from "zustand";

interface StoreState {
  object: Mesh | null;
  update: (options: Partial<StoreState>) => void;
}

export const useAttributeVisualiserStore = create<StoreState>((set) => ({
  object: null,
  update: (options) => set((state) => ({ ...state, ...options })),
}));

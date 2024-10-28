import { create } from "zustand";

type CountStore = {
  count: number;
  inc: () => void;
};

export const useCountStore = create<CountStore>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

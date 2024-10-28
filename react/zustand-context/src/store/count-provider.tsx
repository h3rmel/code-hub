import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";

type CountStore = {
  count: number;
  inc: () => void;
};

const CounterContext = createContext<StoreApi<CountStore> | undefined>(
  undefined
);

type CounterProviderProps = PropsWithChildren & {
  initialCount: number;
};

export function CountProvider({
  initialCount,
  children,
}: CounterProviderProps) {
  const [store] = useState(() =>
    createStore<CountStore>((set) => ({
      count: initialCount,
      inc: () => set((state) => ({ count: state.count + 1 })),
    }))
  );

  return (
    <CounterContext.Provider value={store}>{children}</CounterContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCountStore<T>(selector: (state: CountStore) => T) {
  const context = useContext(CounterContext);

  if (!context) throw new Error("CountContext.Provider is missing...");

  return useStore(context, selector);
}

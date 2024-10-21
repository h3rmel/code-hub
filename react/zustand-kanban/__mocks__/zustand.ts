import { act } from "react-dom/test-utils";
import { beforeEach, vi } from "vitest";

const { create: actualCreate } = await vi.importActual("zustand");

// A variable to hold reset functions for all stores included in the app
const storeResetFns = new Set();

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = (createState) => {
  const store = actualCreate(createState);
  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};

// Reset all stores after each test run
beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  act(() => storeResetFns.forEach((resetFn: any) => resetFn()));
});

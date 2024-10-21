//#region Imports

import { useEffect } from "react";

import { useKanban } from "./kanban";

import { test, expect, vi } from "vitest";

import { render } from "@testing-library/react";

//#endregion

vi.mock("zustand");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TestComponent({ selector, effect }: { selector: any; effect: any }) {
  const items = useKanban(selector);

  useEffect(() => {
    effect(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return null;
}

test("Should return default value at the start", () => {
  const selector = (store: Kanban) => store.tasks;
  const effect = vi.fn();
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledWith([]);
});

test("Should add an item to the store and re-run the effect", () => {
  const selector = (store: Kanban) => ({
    tasks: store.tasks,
    addTask: store.addTask,
  });
  const effect = vi.fn().mockImplementation((items: Kanban) => {
    if (items.tasks.length === 0) {
      items.addTask({
        id: 1,
        title: "Vitest test task!",
        description: "Running some Vitest unit tests...",
        state: "DONE",
      });
    }
  });
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(2);
  expect(effect).toHaveBeenCalledWith(
    expect.objectContaining({
      tasks: [
        {
          id: 1,
          title: "Vitest test task!",
          description: "Running some Vitest unit tests...",
          state: "DONE",
        },
      ],
    })
  );
});

test("Should add and delete an item to the store", (currentItems: Kanban) => {
  const selector = (store: Kanban) => ({
    tasks: store.tasks,
    addTask: store.addTask,
    deleteTask: store.deleteTask,
  });

  let createdTask: boolean = false;
  const effect = vi.fn().mockImplementation((items: Kanban) => {
    currentItems = items;
    if (!createdTask) {
      items.addTask({
        id: 1,
        title: "Vitest test task!",
        description: "Running some Vitest unit tests...",
        state: "DONE",
      });
      createdTask = true;
    } else if (items.tasks.length === 1) {
      items.deleteTask(1);
    }
  });
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(3);
  expect(currentItems.tasks).toEqual([]);
});

//#region Imports

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

//#endregion

const initialKanban: [] = [];

export const useKanban = create<Kanban>(
  devtools(
    persist(
      (set) => ({
        tasks: initialKanban,
        draggedTask: null,
        addTask: (newTask: Task) => {
          set((state: { tasks: Task[] }) => ({
            tasks: [...state.tasks, newTask],
          }));
        },
        editTask: (taskId: number, updatedTask: Task) => {
          set((state: Kanban) => ({
            tasks: state.tasks.map((task: Task) =>
              task.id === taskId ? { ...task, ...updatedTask } : task
            ),
          }));
        },
        deleteTask: (taskId: number) => {
          set((state: Kanban) => ({
            tasks: state.tasks.filter((task: Task) => task.id !== taskId),
          }));
        },
        setDraggedTask: (taskId: number) => {
          set(() => ({
            draggedTask: taskId,
          }));
        },
        moveTask: (taskId: number, newState: string) => {
          set((state: Kanban) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? {
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    state: newState,
                  }
                : task
            ),
          }));
        },
      }),
      {
        name: "kanban-tasks",
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any
);

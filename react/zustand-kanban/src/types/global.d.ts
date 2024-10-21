export {};

declare global {
  //*
  //* Types
  //*

  type Task = {
    id?: number;
    title?: string;
    description?: string;
    state?: string;
  };

  type Kanban = {
    tasks: Task[] | [];
    draggedTask: number | null;
    addTask: (task: Task) => void;
    editTask: (taskId: number, updatedTask: Task) => void;
    deleteTask: (taskId: number) => void;
    setDraggedTask: (taskId: number | null) => void;
    moveTask: (taskId: number, newState: string) => void;
  };

  type StateType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

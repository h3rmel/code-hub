import { Action, ActionTypes, Task } from "../todo";

export const tasksReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case ActionTypes.add:
      return [...state, action.task];
    case ActionTypes.delete:
      return state.filter((task) => task.id !== action.taskId);
    default:
      return state;
  }
};

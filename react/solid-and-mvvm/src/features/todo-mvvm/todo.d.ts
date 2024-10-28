export enum ActionTypes {
  add = "ADD_TASK",
  delete = "DELETE_TASK",
}

export type Action =
  | { type: ActionTypes.add; task: Task }
  | { type: ActionTypes.delete; taskId: number };

export type Task = {
  id: number;
  name: string;
};
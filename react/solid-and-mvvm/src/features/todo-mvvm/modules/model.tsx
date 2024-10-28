import { ElementRef, useReducer, useRef } from "react";

import { Task, ActionTypes } from "../todo";
import { tasksReducer } from "../reducers/todo-reducer";

export function useTodoModel() {
  const [tasksList, dispatch] = useReducer(tasksReducer, []);
  const taskNameRef = useRef<ElementRef<"input">>(null);

  function handleAddTask() {
    if (!taskNameRef.current?.value) return;

    const newTask: Task = {
      id: Math.floor(Math.random() * 10000),
      name: taskNameRef.current.value,
    };

    dispatch({ type: ActionTypes.add, task: newTask });
    taskNameRef.current.value = "";
  }

  function handleDeleteTask(taskId: number) {
    dispatch({ type: ActionTypes.delete, taskId: taskId });
  }

  return {
    taskNameRef,
    tasksList,
    handleAddTask,
    handleDeleteTask,
  };
}

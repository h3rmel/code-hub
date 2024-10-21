//#region Imports

import { useMemo } from "react";

import { useKanban } from "@/stores/kanban";

import { Task } from "./Task";

//#endregion

interface ColumnProps {
  title: string;
  state: string;
}

export const Column = ({ title, state }: ColumnProps) => {
  const { tasks, draggedTask, moveTask } = useKanban();

  const filteredTasks = useMemo(
    () => tasks.filter((task: Task) => task.state === state),
    [tasks, state]
  );

  const handleDrop = () => {
    moveTask(draggedTask!, state);
  };

  return (
    <section
      className="w-1/3 overflow-y-auto bg-slate-2 border border-slate-300/10 rounded-2xl"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 className="text-xl font-medium pt-4 pb-2 border-b border-b-slate-300/10">
        <span className="mx-4">{title}</span>
      </h2>
      <div className="space-y-3 p-4">
        {filteredTasks.length > 0
          ? filteredTasks?.map((task: Task) => (
              <Task key={task.id} id={task.id!} />
            ))
          : "Nao há tarefas."}
      </div>
    </section>
  );
};

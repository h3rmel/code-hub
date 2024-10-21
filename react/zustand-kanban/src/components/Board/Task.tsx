//#region Imports

import { useMemo } from "react";

import { ConfirmButton } from "../ConfirmButton/ConfirmButton";

import { useKanban } from "@/stores/kanban";

import { Check, Trash } from "@phosphor-icons/react";

//#endregion

interface TaskProps {
  id: number;
}

export const Task = ({ id }: TaskProps) => {
  const { tasks, deleteTask, setDraggedTask } = useKanban();

  const filteredTask = useMemo(
    () => tasks.find((task) => task.id === id),
    [id, tasks]
  );

  //#region Methods

  const handleDelete = () => {
    deleteTask(id);
  };

  const handleDragStart = () => {
    setDraggedTask(id);
  };

  //#endregion

  return (
    <article
      className="relative card border border-transparent hover:border-slate-300/10 cursor-grab duration-150"
      draggable={true}
      onDragStart={handleDragStart}
    >
      <div className="card-body gap-0">
        <h4 className="text-lg text-slate-200">{filteredTask?.title}</h4>
        <p className="text-sm text-slate-400">{filteredTask?.description}</p>
      </div>
      <ConfirmButton
        onConfirm={handleDelete}
        className="btn btn-sm btn-circle btn-ghost absolute right-[8px] bottom-2 hover:text-red-8"
        messages={["Remover", "Confirmar"]}
        dialog={[
          <Trash size={16} weight="bold" />,
          <Check size={16} weight="bold" />,
        ]}
      />
      {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-[48px] bottom-2 hover:text-blue-8">
        <span className="tooltip tooltip-top" data-tooltip="Editar">
          <Pencil size={16} weight="bold" />
        </span>
      </button> */}
    </article>
  );
};

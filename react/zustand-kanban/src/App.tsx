//#region Imports

import { useState, useRef, ChangeEvent, FormEvent } from "react";

import { Board } from "@/components/Board/Board";

import { Modal, ModalHeader, ModalTrigger } from "@/components/ui/Modal";

import { useKanban } from "@/stores/kanban";

import { updateState } from "@/utils/updateState";

//#endregion

export const App = () => {
  const [newTask, setNewTask] = useState<Task>({
    id: new Date().getTime(),
    title: "",
    description: "",
    state: "",
  });

  const modalAddCloseRef = useRef<HTMLLabelElement>(null);

  const { addTask } = useKanban();

  //#region Methods

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    updateState(event, setNewTask);
  };

  const handleAddSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTask(newTask);

    modalAddCloseRef.current!.click();
    setNewTask({
      id: new Date().getTime(),
      title: "",
      description: "",
      state: "",
    });
  };

  //#endregion

  return (
    <main className="flex w-full min-h-screen overflow-y-hidden">
      <section className="w-[20%] py-4 border-r border-r-slate-300/10">
        <h1 className="text-2xl font-semibold tracking-wide pb-2 border-b border-b-slate-300/10">
          <span className="pl-4">Zustand Kanban</span>
        </h1>
        <div className="p-4">
          <ModalTrigger id="modal-createTask" className="btn btn-primary">
            Criar task
          </ModalTrigger>
          <Modal modalCloseRef={modalAddCloseRef} id="modal-createTask">
            <ModalHeader
              title="Adicionar tarefa!"
              description="Preencha os campos para adicionar."
            />
            <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  className="input input-solid max-w-none w-full"
                  placeholder="Título"
                  name="title"
                  value={newTask.title}
                  onChange={handleChange}
                  required
                />
                <textarea
                  className="textarea textarea-solid max-w-none w-full"
                  placeholder="Descrição"
                  name="description"
                  value={newTask.description}
                  onChange={handleChange}
                  required
                />
                <select
                  className="select select-solid max-w-none w-full"
                  name="state"
                  value={newTask.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione um</option>
                  <option value="TODO">TODO</option>
                  <option value="DOING">DOING</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>
              <div className="flex gap-2">
                <label className="btn btn-block" htmlFor="modal-createTask">
                  Cancelar
                </label>
                <button className="btn btn-primary btn-block" type="submit">
                  Criar
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </section>
      <Board />
    </main>
  );
};

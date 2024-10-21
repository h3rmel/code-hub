import { useState } from "react";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/translucent.css";

import * as formCss from "@modules/form.module.css";
import * as tasksCss from "@modules/tasks.module.css";

const Task = ({ data, editCallback, deleteCallback }) => {
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState({
    completed: data.completed,
    id: data.id,
    name: data.name,
  });

  const handleEditCallback = () => {
    setEditing(false);
    editCallback(task);
  };

  return (
    <div
      className={`${tasksCss.taskCard} ${
        task.completed ? tasksCss.completed : ""
      }`}
    >
      <div className={tasksCss.taskForm}>
        {editing ? (
          <>
            <Tippy arrow={false} content="Completar tarefa">
              <input
                type="checkbox"
                className={formCss.checkbox}
                value={task.completed}
                checked={task.completed}
                onClick={() => setTask({ ...task, completed: !task.completed })}
              />
            </Tippy>
            <input
              type="text"
              className={formCss.input}
              value={task.name}
              onChange={(e) =>
                setTask({
                  ...task,
                  name: e.target.value,
                })
              }
            />
          </>
        ) : (
          <Tippy
            arrow={false}
            content={task.completed ? "Tarefa completa" : "Pendente"}
          >
            <span className={tasksCss.description}>{data.name}</span>
          </Tippy>
        )}
        {editing ? (
          <button
            className={`${tasksCss.btn} ${tasksCss.primary} ${tasksCss.save}`}
            onClick={handleEditCallback}
          >
            Salvar
          </button>
        ) : null}
      </div>
      <div className={tasksCss.taskBtns}>
        {editing ? (
          <button
            className={`${tasksCss.btn} ${tasksCss.danger}`}
            onClick={() => setEditing(false)}
          >
            Cancelar
          </button>
        ) : (
          <button
            className={`${tasksCss.btn} ${tasksCss.primary}`}
            onClick={() => setEditing(true)}
          >
            Editar
          </button>
        )}
        <button
          className={`${tasksCss.btn} ${tasksCss.danger}`}
          onClick={() => deleteCallback(data.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Task;

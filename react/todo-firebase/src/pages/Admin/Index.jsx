import { useEffect, useState } from "react";

import TaskList from "@/components/TaskList";
import MainLayout from "@/layouts/MainLayout";

import { createNewTask } from "@/services/tasks/createTask";
import { loadTasks } from "@/services/tasks/loadTasks";

import { signOut } from "firebase/auth";

import { auth } from "@/services/firebase";

import { toast } from "react-toastify";

import * as adminCss from "@modules/admin.module.css";
import * as formCss from "@modules/form.module.css";
import * as layoutCss from "@modules/layout.module.css";

export const Admin = () => {
  const [user, setUser] = useState({});
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const userDetail = localStorage.getItem("@detailUser");
    setUser(JSON.parse(userDetail));

    if (!user) toast.error("Ocorreu um erro ao resgatar os dados do usuário!");

    const userData = JSON.parse(userDetail);

    try {
      await loadTasks(userData, setTasks);
    } catch (error) {
      toast.error(`Erro ao carregar as tarefas! ${error}`);
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      toast.success("Desconectado com sucesso!");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCreateNewTask = async (e) => {
    e.preventDefault();

    try {
      await createNewTask(newTask, user.id);
      setNewTask("");
      toast.success("Tarefa criada com sucesso!");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <MainLayout pageTitle="Admin">
      <hgroup className={layoutCss.headings}>
        <h1 className="text-center heading">Meu TODO</h1>
        <h4 className="text-center">
          Aqui estão todas as suas tarefas, organize-as como achar melhor! 😉
        </h4>
      </hgroup>
      <form className={formCss.form} onSubmit={handleCreateNewTask}>
        <textarea
          className={formCss.input}
          placeholder="Adicione uma tarefa..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className={formCss.btn} type="submit">
          Adicionar tarefa
        </button>
      </form>
      <hr className={layoutCss.divider} />
      <TaskList tasks={tasks} callback={loadUserData} />
      <button className={adminCss.logout} onClick={handleLogOut}>
        Sair
      </button>
    </MainLayout>
  );
};

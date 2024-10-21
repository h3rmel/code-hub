import { addDoc, collection } from "firebase/firestore";
import { database } from "../firebase";

const createNewTask = async (newTask, userId) => {
  if (newTask === "") throw "Digite sua tarefa!";

  try {
    await addDoc(collection(database, "tasks"), {
      name: newTask,
      completed: false,
      created: new Date(),
      userId: userId,
    });
  } catch (error) {
    throw error.code;
  }
};

export { createNewTask };


import { doc, updateDoc } from "firebase/firestore";

import { database } from "@/services/firebase";

const editTask = async (task) => {
  const docRef = doc(database, "tasks", task.id);

  try {
    await updateDoc(docRef, {
      completed: task.completed,
      name: task.name,
    });
  } catch (error) {
    throw error;
  }
};

export { editTask };


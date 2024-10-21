import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from "firebase/firestore";

import { database } from "../firebase";

const loadTasks = (user, setTasks) => {
  const taskRef = collection(database, "tasks");
  const taskQuery = query(
    taskRef,
    orderBy("created", "desc"),
    where("userId", "==", user?.id)
  );

  onSnapshot(taskQuery, (snapshot) => {
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      completed: doc.data().completed,
      userId: doc.data().userId,
    }));
    list.sort((a, b) => a.completed - b.completed);
    setTasks(list);
  });
};

export { loadTasks };


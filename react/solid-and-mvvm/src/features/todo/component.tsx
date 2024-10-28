import { ChangeEvent, useState } from "react";

type Task = {
  id: number;
  name: string;
};

export function TodoList() {
  const [taskName, setTaskName] = useState<string>("");
  const [tasksList, setTasksList] = useState<Task[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleAddTask = () => {
    if (taskName !== "") {
      const newTask: Task = {
        id: Math.floor(Math.random() * 10000),
        name: taskName,
      };
      setTasksList([...tasksList, newTask]);
      setTaskName("");
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setTasksList(tasksList.filter((task) => task.id !== taskId));
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center gap-8 bg-gray-50 text-gray-900">
      <h1 className="text-center text-3xl font-bold">Todo List</h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={taskName}
          onChange={handleInputChange}
          placeholder="Add a new task"
          className="p-2 block w-full border border-gray-300 shadow-sm h-10 focus:outline-none focus-visible:outline-none rounded-sm hover:border-indigo-500 duration-300"
        />
        <button
          onClick={handleAddTask}
          className="w-full bg-indigo-600 duration-300 hover:bg-indigo-500 h-10 rounded-sm text-white font-medium"
        >
          Add Task
        </button>
      </div>
      <ul className="flex flex-col gap-2 max-w-md w-full">
        {tasksList.map((task) => (
          <li
            key={task.id}
            className="border p-2 pl-3 flex items-center justify-between"
          >
            {task.name}{" "}
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="bg-red-600 duration-300 hover:bg-red-500 rounded-sm text-white font-medium h-10 px-4"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

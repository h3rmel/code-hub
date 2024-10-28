import { useTodoModel } from "./model";
import { TodoView } from "./view";

export function TodoViewModel() {
  const todoModel = useTodoModel();

  return <TodoView {...todoModel} />;
}

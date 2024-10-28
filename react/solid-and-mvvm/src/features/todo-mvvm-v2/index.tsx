import { useTodoModel } from "./index.model";
import { TodoView } from "./index.view";

export function TodoViewModel() {
  const todoModel = useTodoModel();

  return <TodoView {...todoModel} />;
}

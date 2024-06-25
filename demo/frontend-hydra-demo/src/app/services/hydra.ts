import Hydra from "hydra-ai";

import { TodoItemCard } from "../components/todo-item-card";
import { TodoList } from "../components/todo-list";
import { TodoItemSchema, TodoListPropsSchema } from "../model/todo-item";

export const initHydra = (openAIKey: string) => {
  const hydra = new Hydra(openAIKey);

  hydra.registerComponent("todoItemCard", TodoItemCard, TodoItemSchema);

  hydra.registerComponent("todoList", TodoList, TodoListPropsSchema);

  return hydra;
};

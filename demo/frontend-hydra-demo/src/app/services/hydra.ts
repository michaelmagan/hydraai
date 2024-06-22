import Hydra from "hydra-ai-backup";
import { TodoItemCard } from "../components/todo-item-card";
import { TodoList } from "../components/todo-list";

export const initHydra = (openAIKey: string) => {
  const hydra = new Hydra(openAIKey);

  hydra.registerComponent("todoItemCard", TodoItemCard, {
    title: "string",
    description: "string",
    completed: "boolean",
  });

  hydra.registerComponent("todoList", TodoList, {
    items: "array",
    onToggleDone: "function",
  });
  return hydra;
};

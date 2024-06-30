import { HydraClient } from "hydra-ai";
import { TodoItemCard } from "./components/todo-item";
import TodoList from "./components/todo-list";

const hydra = new HydraClient();

hydra.registerComponent("TodoItem", TodoItemCard, {
  item: "{id: string; title: string; isDone: boolean}",
});

hydra.registerComponent("TodoList", TodoList, {
  todoItems: "{id: string; title: string; isDone: boolean}[]",
});

export default hydra;

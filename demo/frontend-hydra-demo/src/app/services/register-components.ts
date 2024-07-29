"use client";

import { ComponentRegistry } from "hydra-ai-test";

import { TodoItemCard } from "../components/todo-item-card";
import { TodoList } from "../components/todo-list";
import { TodoItemSchema, TodoListPropsSchema } from "../model/todo-item";

const registry = ComponentRegistry;

registry.register("todoItemCard", {
  component: TodoItemCard,
  props: TodoItemSchema,
});
registry.register("todoList", {
  component: TodoList,
  props: TodoListPropsSchema,
});

export default registry;

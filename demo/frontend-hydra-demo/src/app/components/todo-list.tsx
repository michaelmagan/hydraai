import React from "react";
import { TodoListProps } from "../model/todo-item";
import { TodoItemCard } from "./todo-item-card";

export const TodoList: React.FC<TodoListProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <TodoItemCard
          key={item.id}
          id={item.id}
          title={item.title}
          isDone={item.isDone}
        />
      ))}
    </div>
  );
};

import React from "react";
import { TodoItem } from "../model/todo-item";
import { TodoItemCard } from "./todo-item-card";

interface TodoListProps {
  items: TodoItem[];
  onToggleDone: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ items, onToggleDone }) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <TodoItemCard
          key={item.id}
          title={item.title}
          isDone={item.isDone}
          onToggle={() => onToggleDone(item.id)}
        />
      ))}
    </div>
  );
};

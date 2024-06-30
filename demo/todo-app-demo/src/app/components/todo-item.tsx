"use client";
import React from "react";
import { TodoItem } from "../model/todo-item";

export interface TodoItemCardProps {
  item: TodoItem;
  onToggle?: (id: string) => void;
}
export const TodoItemCard: React.FC<TodoItemCardProps> = ({
  item,
  onToggle,
}) => {
  const [todoItem, setTodoItem] = React.useState<TodoItem>(item);

  const handleToggle = () => {
    setTodoItem({ ...todoItem, isDone: !todoItem.isDone });
    onToggle && onToggle(todoItem.id);
  };

  return (
    <div
      className={`flex items-center p-4 border rounded-lg text-black ${
        todoItem.isDone ? "bg-green-100" : "bg-white"
      } shadow-sm`}
    >
      <input
        type="checkbox"
        checked={todoItem.isDone}
        className="mr-4"
        onChange={handleToggle}
      />
      <div>
        <h2
          className={`text-lg font-semibold ${
            todoItem.isDone ? "line-through" : ""
          }`}
        >
          {item.title}
        </h2>
        <span
          className={`text-sm ${
            todoItem.isDone ? "text-green-600" : "text-gray-600"
          }`}
        >
          {todoItem.isDone ? "Completed" : "Pending"}
        </span>
      </div>
    </div>
  );
};

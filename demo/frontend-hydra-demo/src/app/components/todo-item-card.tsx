import React from "react";

interface TodoItemCardProps {
  title: string;
  isDone: boolean;
  onToggle?: () => void;
}

export const TodoItemCard: React.FC<TodoItemCardProps> = ({
  title,
  isDone,
  onToggle,
}) => {
  return (
    <div
      className={`flex items-center p-4 border rounded-lg text-black ${
        isDone ? "bg-green-100" : "bg-white"
      } shadow-sm`}
    >
      <input
        type="checkbox"
        checked={isDone}
        onChange={onToggle}
        className="mr-4"
      />
      <div>
        <h2 className={`text-lg font-semibold ${isDone ? "line-through" : ""}`}>
          {title}
        </h2>
        <span
          className={`text-sm ${isDone ? "text-green-600" : "text-gray-600"}`}
        >
          {isDone ? "Completed" : "Pending"}
        </span>
      </div>
    </div>
  );
};

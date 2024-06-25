import React from "react";
import { TodoItemCardProps } from "../model/todo-item";

export const TodoItemCard: React.FC<TodoItemCardProps> = ({
  title,
  isDone,
}) => {
  const isDoneBoolean = isDone === "true";
  // TODO: openAI json mode only supports strings.
  // Right now all of your types need to be strings.
  // And you need to convert them to the correct type before using them.
  // i.e. datetime, boolean, number, etc.
  // In a future version we will handle this inside hydra
  // convert your types to strings, and then convert them to the correct type
  // before returning them to the client.

  return (
    <div
      className={`flex items-center p-4 border rounded-lg text-black ${
        isDoneBoolean ? "bg-green-100" : "bg-white"
      } shadow-sm`}
    >
      <input type="checkbox" checked={isDoneBoolean} className="mr-4" />
      <div>
        <h2
          className={`text-lg font-semibold ${
            isDoneBoolean ? "line-through" : ""
          }`}
        >
          {title}
        </h2>
        <span
          className={`text-sm ${
            isDoneBoolean ? "text-green-600" : "text-gray-600"
          }`}
        >
          {isDoneBoolean ? "Completed" : "Pending"}
        </span>
      </div>
    </div>
  );
};

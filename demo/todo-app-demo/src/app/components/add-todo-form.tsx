import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  TodoItem,
  sampletodoItems,
  updateSampletodoItems,
} from "../model/todo-item";

export default function AddTodoItemForm() {
  const [title, setTitle] = useState("");

  const handleAddItem = () => {
    if (!title) return;
    const newItem: TodoItem = {
      id: uuidv4(),
      title,
      isDone: false,
    };
    updateSampletodoItems([...sampletodoItems, newItem]);
    setTitle("");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        className="border border-gray-300 rounded p-2 m-2"
      />
      <button
        onClick={handleAddItem}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Add Item
      </button>
    </div>
  );
}

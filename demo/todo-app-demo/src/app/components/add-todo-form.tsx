import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoItem } from "../model/todo-item";
import { sampletodoItems, updateTodoItems } from "../services/todo-service";

export default function AddTodoItemForm() {
  const [title, setTitle] = useState("");
  const [complete, setComplete] = useState(false);

  const handleAddItem = () => {
    if (!title) return;
    const newItem: TodoItem = {
      id: uuidv4(),
      title,
      isDone: false,
    };
    setTitle("");
    setComplete(true);
    updateTodoItems([...sampletodoItems, newItem]);
  };

  return (
    <div className="flex flex-col items-center justify-center text-black">
      {complete ? (
        <div className="bg-green-100 p-2 m-2 rounded">added!</div>
      ) : (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            className="border border-gray-300 rounded p-2 m-2"
          />
          <button
            onClick={handleAddItem}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Item
          </button>
        </>
      )}
    </div>
  );
}

import { z } from "zod";

export const TodoItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  isDone: z.enum(["true", "false"]),
});

export type TodoItem = z.infer<typeof TodoItemSchema>;

export type TodoItemCardProps = z.infer<typeof TodoItemSchema>;

export const TodoListPropsSchema = z.object({
  items: z.array(TodoItemSchema),
});

export type TodoListProps = z.infer<typeof TodoListPropsSchema>;
export const testItems = [
  {
    id: "0",
    title: "Buy groceries",
    isDone: false,
  },
  {
    id: "1",
    title: "Walk the dog",
    isDone: false,
  },
  {
    id: "2",
    title: "Clean the house",
    isDone: false,
  },
  {
    id: "3",
    title: "Do the laundry",
    isDone: false,
  },
];

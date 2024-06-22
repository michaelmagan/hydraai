export interface TodoItem {
  id: string;
  title: string;
  isDone: boolean;
}

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

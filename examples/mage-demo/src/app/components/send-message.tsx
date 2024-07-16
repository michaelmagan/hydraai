export const SendMessage = () => {
  return (
    <div className="flex flex-row items-center justify-center w-full p-4">
      <input
        type="text"
        className="w-full p-2 rounded-lg shadow-lg"
        placeholder="Type your message here..."
      />
      <button className="ml-4 bg-blue-500 text-white p-2 rounded-lg shadow-lg">
        Send
      </button>
    </div>
  );
};

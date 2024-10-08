import { useState } from "react";
import hydra from "../hydra-client";
import { DynamicMessage } from "../model/dynamic-message";
import { getTodoItems } from "../services/todo-service";
import DynamicMessageHistory from "./dynamic-message-history";
import { Info } from "./info";

const initialMessages: DynamicMessage[] = [
  {
    who: "HydraAI ToDo Demo",
    message:
      "Hello! Try sending something like 'show me my todo list' or 'show me items not done'",
    type: "text",
  },
];

export default function DynamicChatbox() {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageHistory, setMessageHistory] = useState<DynamicMessage[]>([
    ...initialMessages,
  ]);
  const [viewingInfo, setViewingInfo] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!text) return;
    const userMessage: DynamicMessage = {
      who: "Input",
      message: text,
      type: "text",
    };
    setMessageHistory((prevHistory) => [...prevHistory, userMessage]);
    await processUserMessage(text);
  };

  const processUserMessage = async (message: string) => {
    setIsLoading(true);
    const response = await hydra.generateComponent(
      `my list of todo items is ${JSON.stringify(getTodoItems())}, 
       and previous messages are ${JSON.stringify(
         messageHistory
       )} latest message: ${message}`
    );
    const hydraMessage: DynamicMessage = {
      component: response.component,
      who: "HydraAI",
      type: "component",
      message: "",
    };
    setIsLoading(false);
    setMessageHistory((prevHistory) => [...prevHistory, hydraMessage]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(inputMessage);
      setInputMessage(""); // Clear the input after submission
    }
  };

  return (
    <div className="relative flex flex-col bg-black text-white p-4 h-full w-full max-w-[500px] mx-auto">
      <div className="flex justify-center items-center mb-4">
        <button
          className="text-white bg-gray-900 rounded-lg p-2 button"
          onClick={() => setViewingInfo(!viewingInfo)}
        >
          {viewingInfo ? "Close Info" : "Show Info"}
        </button>
      </div>
      {viewingInfo ? (
        <Info />
      ) : (
        <>
          <div className="flex-grow overflow-auto mb-20">
            <DynamicMessageHistory messages={messageHistory} />
            {isLoading && <div className="text-center">Loading...</div>}
          </div>
          <div className="flex items-center bg-gray-900 rounded-lg p-2 fixed bottom-4 left-0 right-0 w-full max-w-[500px] mx-auto">
            <input
              type="text"
              placeholder="message hydraai..."
              className="flex-grow bg-transparent text-white placeholder-gray-500 outline-none"
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              value={inputMessage}
            />
            <div className="flex ml-2">
              <SendIcon
                className="w-6 h-6 cursor-pointer button"
                onClick={() => {
                  handleSendMessage(inputMessage);
                  setInputMessage(""); // Clear the input after submission
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={props.onClick}
    >
      <path d="M2 12h20" />
      <path d="M12 2l10 10-10 10" />
    </svg>
  );
}

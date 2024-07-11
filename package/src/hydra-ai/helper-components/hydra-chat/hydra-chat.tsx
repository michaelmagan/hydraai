import React, { useState } from "react";
import HydraClient from "../../hydra-ai-client";
import HydraChatMessage from "./hydra-chat-message";
import HydraMessageHistory from "./hydra-message-history";
import SendIcon from "./send-icon";

interface HydraChatProps {
  hydraClient: HydraClient;
  initialMessages: HydraChatMessage[];
  aiName?: string;
}

export default function HydraChat({
  hydraClient: hydra,
  initialMessages,
  aiName = "Hydra",
}: HydraChatProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageHistory, setMessageHistory] = useState<HydraChatMessage[]>([
    ...initialMessages,
  ]);

  const handleSendMessage = async (text: string) => {
    if (!text) return;
    const userMessage: HydraChatMessage = {
      sender: "Input",
      message: text,
      type: "text",
    };
    setMessageHistory((prevHistory) => [...prevHistory, userMessage]);
    await processUserMessage(text);
  };

  const processUserMessage = async (message: string) => {
    setIsLoading(true);
    const response = await hydra.generateComponent(
      `previous messages are ${JSON.stringify(
        messageHistory
      )} latest message: ${message}`
    );
    const hydraMessage: HydraChatMessage = {
      component: response,
      sender: aiName,
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
    <div className="relative flex flex-col bg-black text-white p-4 h-full w-full">
      <div className="flex-grow overflow-auto mb-20">
        <HydraMessageHistory messages={messageHistory} />
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
              setInputMessage("");
            }}
          />
        </div>
      </div>
    </div>
  );
}

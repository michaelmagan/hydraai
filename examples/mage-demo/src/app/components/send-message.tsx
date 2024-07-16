"use client";
import { useState } from "react";
import { DirectMessage } from "../model/direct-message";

interface SendMessageProps {
  message: DirectMessage;
}

export const SendMessage = ({ message }: SendMessageProps) => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [messageText, setMessageText] = useState(message.message);

  const handleSendMessage = () => {
    setIsSending(true);

    // Simulate message sending process
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 1000); // Simulate delay for sending message
  };

  return (
    <div className="flex flex-row items-center justify-center w-full p-4">
      {isSent ? (
        <div className="">Sent!</div>
      ) : (
        <>
          <input
            type="text"
            className="w-full p-2 rounded-lg shadow-lg"
            placeholder="Type your message here..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            disabled={isSending}
          />
          <button
            className="ml-4 bg-blue-500 text-white p-2 rounded-lg shadow-lg"
            onClick={handleSendMessage}
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </>
      )}
    </div>
  );
};

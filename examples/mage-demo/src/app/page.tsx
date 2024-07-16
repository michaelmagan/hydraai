"use client";

import { HydraChat } from "hydra-ai";
import hydra from "./hydra-client";

export default function Home() {
  return (
    <div
      className="flex flex-col h-screen  text-white p-4 justify-center items-center"
      style={{ backgroundColor: "#AAB7B5" }}
    >
      <div
        className="flex-grow overflow-y-auto  text-xs w-full max-w-xl text-black rounded-lg shadow-lg"
        style={{ backgroundColor: "#F0F0F0" }}
      >
        <HydraChat
          hydraClient={hydra}
          initialMessages={[
            {
              sender: "Hydra",
              message:
                "Hello! I'm Hydra, your personal assistant. How can I help you today?",
              type: "text",
            },
          ]}
          inputBackgroundColor="white"
          inputTextColor="black"
        />
      </div>
    </div>
  );
}

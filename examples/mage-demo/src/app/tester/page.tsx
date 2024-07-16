"use client";

import { HydraChat } from "hydra-ai";
import hydra from "../hydra-client";

export default function TesterPage() {
  return (
    <div
      className="flex flex-col h-screen  text-white p-4 justify-center items-center"
      style={{ backgroundColor: "#e3e3e3" }}
    >
      <div
        className="flex-grow overflow-y-auto  text-sm w-full max-w-xl text-black rounded-lg shadow-lg"
        style={{ backgroundColor: "white" }}
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
          inputBackgroundColor="#b1b1b1"
          inputTextColor="black"
        />
      </div>
    </div>
  );
}

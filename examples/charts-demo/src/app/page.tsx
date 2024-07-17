"use client";

import { HydraChat } from "hydra-ai-backup";
import React from "react";
import hydra from "./hydra-client";

export default function Home() {
  const [hydraComponent, setHydraComponent] =
    React.useState<React.ReactElement | null>(null);

  const handleHydraComponent = (component: React.ReactElement) => {
    console.log(component);
    setHydraComponent(component);
  };

  return (
    <div
      className="flex flex-row flex-wrap-reverse h-[100dvh] text-black p-4 justify-center items-center"
      style={{ backgroundColor: "#162E3B" }}
    >
      <div className="h-[60%] w-full max-w-xl flex-grow overflow-y-auto text-sm  text-[#B5D3BF] rounded-lg p-2 md:p-4 ">
        <HydraChat
          hydraClient={hydra}
          initialMessages={[
            {
              sender: "Hydra",
              message: `I am a Hydra-powered AI agent that has access to demo transaction data, with the ability to show charts. Try asking about your monthly spending.`,
              type: "text",
            },
          ]}
          inputBackgroundColor="#050C0F"
          inputTextColor="white"
          aiMessageColor="#B5D3BF"
          userMessageColor="white"
          handleComponent={handleHydraComponent}
        />
      </div>

      <div>{hydraComponent}</div>
    </div>
  );
}

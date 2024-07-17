"use client";

import { HydraChat } from "hydra-ai-backup";
import React from "react";
import hydra from "./hydra-client";

export default function Home() {
  const [hydraComponent, setHydraComponent] =
    React.useState<React.ReactElement | null>(null);

  const handleHydraComponent = (component: React.ReactElement) => {
    setHydraComponent(component);
  };

  return (
    <div
      className="flex flex-row h-[100dvh] text-black p-4 justify-center items-center"
      style={{ backgroundColor: "#162E3B" }}
    >
      <div className="h-[60%] flex-grow overflow-y-auto  text-sm w-full max-w-xl text-[#B5D3BF] rounded-lg p-4 ">
        <HydraChat
          hydraClient={hydra}
          initialMessages={[
            {
              sender: "Hydra",
              message: `How can I help you?`,
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

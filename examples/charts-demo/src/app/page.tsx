"use client";

import { HydraChat } from "hydra-ai";
import HydraPieChart from "./components/pie-chart";
import hydra from "./hydra-client";

export default function Home() {
  return (
    <div
      className="flex flex-row h-[100dvh] text-black p-4 justify-center items-center"
      style={{ backgroundColor: "#162E3B" }}
    >
      <div className="h-full flex-grow overflow-y-auto  text-sm w-full max-w-xl text-[#B5D3BF] rounded-lg p-4 ">
        <HydraChat
          hydraClient={hydra}
          initialMessages={[
            {
              sender: "Hydra",
              message: `hello`,
              type: "text",
            },
          ]}
          inputBackgroundColor="white"
          inputTextColor="black"
        />
      </div>
      <HydraPieChart
        data={[
          { name: "A", value: 400 },
          { name: "b", value: 200 },
        ]}
      />
    </div>
  );
}

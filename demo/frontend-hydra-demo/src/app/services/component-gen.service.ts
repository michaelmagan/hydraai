"use server";

import Hydra from "hydra-ai";
import { ReactElement } from "react";
import { initHydra } from "./hydra";

let hydra: Hydra | null;

export const generateDynamicMessage = async (
  message: string
): Promise<{
  componentName: string;
  explanation: string;
  hydratedComponent: ReactElement;
}> => {
  if (!hydra) {
    hydra = initHydra(process.env.OPENAI_API_KEY ?? "");
  }
  const response = await hydra.handleMessage(message);
  console.log("Response:", response);
  return response;
};

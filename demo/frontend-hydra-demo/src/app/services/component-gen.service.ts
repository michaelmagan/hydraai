"use server";

import { initHydra } from "./hydra";
import React from "react";

export const generateDynamicMessage = async (
  message: string
): Promise<{
  componentName: string;
  explanation: string;
  hydratedComponent: React.ReactElement;
}> => {
  const hydra = initHydra(process.env.OPENAI_API_KEY ?? "");
  const response = await hydra.handleMessage(message);
  console.log("Response:", response);
  return response;
};

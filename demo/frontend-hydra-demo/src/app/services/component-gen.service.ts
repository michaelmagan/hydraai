"use server";

import React from "react";
import { initHydra } from "./hydra";

export const generateDynamicMessage = async (
  message: string
): Promise<React.ReactElement> => {
  const hydra = initHydra(process.env.OPENAI_API_KEY ?? "");
  const response = await hydra.generateComponent(message);
  console.log("Response:", response);
  return response as React.ReactElement;
};

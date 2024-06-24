"use server";

import { DynamicMessage } from "../model/dynamic-message";
import { initHydra } from "./hydra";

export const generateDynamicMessage = async (
  message: string
): Promise<DynamicMessage> => {
  const hydra = initHydra(process.env.OPENAI_API_KEY ?? "");
  const response = await hydra.generateComponent(message);
  console.log("Response:", response);
  return {
    who: "Hydra AI",
    message: message,
    type: response.type,
    componentData: response.props,
  };
};

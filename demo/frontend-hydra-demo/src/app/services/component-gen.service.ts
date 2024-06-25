"use server";

import { hydra } from "./hydra";

export const generateDynamicMessage = async (
  message: string
): Promise<{
  componentName: string;
  explanation: string;
  props: any;
}> => {
  const response = await hydra.handleMessage(message);
  console.log("Response:", response);
  return response;
};

import { DynamicMessage } from "../model/dynamic-message";
import { initHydra } from "./hydra";

export const generateDynamicMessage = async (
  message: string
): Promise<DynamicMessage> => {
  const hydra = initHydra("your-openai-key"); // Replace with your actual OpenAI key
  const response = await hydra.generateComponent(message);
  console.log("Response:", response);

  console.log("Response:", response);
  return {
    who: "bot",
    message: message,
    type: response.availableComponents.name,
    componentData: response.availableComponents.props,
  };
};

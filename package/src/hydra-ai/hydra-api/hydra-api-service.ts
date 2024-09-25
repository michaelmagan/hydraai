import { ComponentChoice } from "../model";
import { ChatMessage } from "../model/chat-message";
import { ComponentDecision } from "../model/component-choice";
import {
  AvailableComponent,
  AvailableComponents,
} from "../model/component-metadata";

const BASE_URL = "http://localhost:3000";

export const hydraGenerate = async (
  messageHistory: ChatMessage[],
  availableComponents: AvailableComponents,
  apiKey?: string
): Promise<ComponentDecision> => {
  if (!apiKey) {
    throw new Error("API key is required for using hydraAPI");
  }

  try {
    const response = await fetch(`${BASE_URL}/components/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        messageHistory,
        availableComponents,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate component");
    }

    const result = await response.json();
    return result as ComponentDecision;
  } catch (error) {
    console.error("Error in hydraGenerate:", error);
    throw error;
  }
};

export const hydraHydrate = async (
  messageHistory: ChatMessage[],
  component: AvailableComponent,
  toolResponse: any,
  apiKey?: string
): Promise<ComponentChoice> => {
  if (!apiKey) {
    throw new Error("API key is required for using hydraAPI");
  }
  try {
    const response = await fetch(`${BASE_URL}/components/hydrate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        messageHistory,
        component,
        toolResponse,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to hydrate component");
    }

    const result = await response.json();
    return result as ComponentChoice;
  } catch (error) {
    console.error("Error in hydraHydrate:", error);
    throw error;
  }
};

"use server";

import HydraBackend from "./hydra-ai-backend";
import { ChatMessage } from "./model/chat-message";
import { ComponentDecision } from "./model/component-choice";
import {
  AvailableComponent,
  AvailableComponents,
  ComponentContextToolMetadata,
} from "./model/component-metadata";
import { ComponentPropsMetadata } from "./model/component-props-metadata";

let hydraBackend: HydraBackend;

export async function initBackend(model?: string): Promise<void> {
  if (!hydraBackend) {
    hydraBackend = new HydraBackend(
      process.env.OPENAI_API_KEY ?? "",
      model,
      process.env.POSTGRES_DB_URL
    );
  }
}

export async function saveComponent(
  name: string,
  description: string,
  propsDefinition: ComponentPropsMetadata,
  contextToolDefinitions: ComponentContextToolMetadata[]
): Promise<boolean> {
  const success = await hydraBackend.registerComponent(
    name,
    description,
    propsDefinition,
    contextToolDefinitions
  );
  return success;
}

export async function chooseComponent(
  messageHistory: ChatMessage[],
  availableComponents: AvailableComponents
): Promise<ComponentDecision> {
  const response = await hydraBackend.generateComponent(
    messageHistory,
    availableComponents
  );
  return response;
}

export async function hydrateComponent(
  messageHistory: ChatMessage[],
  component: AvailableComponent,
  toolResponse: any
): Promise<ComponentDecision> {
  const response = await hydraBackend.hydrateComponentWithData(
    messageHistory,
    component,
    toolResponse
  );
  return response;
}

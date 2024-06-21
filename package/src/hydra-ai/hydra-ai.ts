import React, { ComponentType, ReactElement } from "react";
import AIService from "./ai-service";
import { ComponentPropsMetadata, InputContext } from "./model/input-context";

interface ComponentMetadata {
  component: ComponentType<any>;
  props: ComponentPropsMetadata;
}

interface ComponentRegistry {
  [key: string]: ComponentMetadata;
}

export default class Hydra {
  private componentList: ComponentRegistry = {};
  private aiService: AIService;

  constructor(openAIKey: string) {
    this.aiService = new AIService(openAIKey);
  }

  public registerComponent(
    name: string,
    component: ComponentType<any>,
    propsDefinition?: ComponentPropsMetadata
  ): void {
    if (!this.componentList[name]) {
      this.componentList[name] = { component, props: propsDefinition || {} };
    } else {
      throw new Error(
        `A component with name: ${name} is already registered. Try another name.`
      );
    }
  }

  public async generateComponent(message: string): Promise<ReactElement> {
    const context: InputContext = {
      chatMessage: message,
      availableComponents: Object.keys(this.componentList).map((name) => ({
        name,
        props: this.componentList[name].props,
      })),
    };
    const componentChoice = await this.aiService.chooseComponent(context);
    const componentEntry = this.componentList[componentChoice.componentName];

    if (!componentEntry) {
      throw new Error(
        `Hydra tried to use Component ${componentChoice.componentName}, but it was not found.`
      );
    }

    return React.createElement(componentEntry.component, componentChoice.props);
  }
}

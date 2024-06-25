import React, { ComponentType, ReactElement } from "react";
import AIService from "./ai-service";
import { ComponentMetadata } from "./model/component-metadata";
import { ComponentPropsMetadata } from "./model/component-props-metadata";
import { InputContext } from "./model/input-context";

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

  public async handleMessage(
    message: string
  ): Promise<{
    componentName: string;
    explanation: string;
    hydratedComponent: ReactElement;
  }> {
    const context: InputContext = {
      chatMessage: message,
      availableComponents: Object.keys(this.componentList).map((name) => ({
        componentName: name,
        props: this.componentList[name].props,
      })),
    };
    const componentChoice = await this.aiService.chooseComponent(context);
    const hydratedComponent = await this.hydrateComponent(
      componentChoice.componentName,
      message
    );
    return {
      componentName: componentChoice.componentName,
      explanation: componentChoice.explanation,
      hydratedComponent: hydratedComponent,
    };
  }

  async hydrateComponent(
    componentName: string,
    message: string
  ): Promise<ReactElement> {
    const componentEntry = this.componentList[componentName];

    if (!componentEntry) {
      throw new Error(
        `Hydra tried to use Component ${componentName}, but it was not found.`
      );
    }

    const context: InputContext = {
      chatMessage: message,
      availableComponents: Object.keys(this.componentList).map((name) => ({
        componentName: name,
        props: this.componentList[name].props,
      })),
    };

    const props = await this.aiService.hydrateComponent(context, componentName);

    return React.createElement(componentEntry.component, props);
  }
}

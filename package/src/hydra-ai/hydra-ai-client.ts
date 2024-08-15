import React, { ComponentType } from "react";
import { chooseComponent, saveComponent } from "./hydra-server-action";
import { ComponentChoice } from "./model";
import {
  AvailableComponents,
  ComponentContextTool,
  ComponentContextToolMetadata,
  RegisteredComponent,
} from "./model/component-metadata";
import { ComponentPropsMetadata } from "./model/component-props-metadata";
import { GenerateComponentResponse } from "./model/generate-component-response";

interface ComponentRegistry {
  [key: string]: RegisteredComponent;
}

export default class HydraClient {
  private componentList: ComponentRegistry = {};

  public async registerComponent(
    name: string,
    description: string,
    component: ComponentType<any>,
    propsDefinition: ComponentPropsMetadata = {},
    contextTools: ComponentContextTool[] = [],
    callback: (
      name: string,
      description: string,
      propsDefinition: ComponentPropsMetadata,
      contextToolDefinitions: ComponentContextToolMetadata[]
    ) => Promise<boolean> = saveComponent
  ): Promise<void> {
    const success = await callback(
      name,
      description,
      propsDefinition,
      contextTools.map((tool) => tool.definition)
    );

    if (!success) {
      return;
    }

    if (!this.componentList[name]) {
      this.componentList[name] = {
        component,
        name,
        description,
        props: propsDefinition,
        contextTools: contextTools,
      };
    } else {
      throw new Error(
        `A component with name: ${name} is already registered. Try another name.`
      );
    }
  }

  public async generateComponent(
    message: string,
    callback: (
      message: string,
      availableComponents: AvailableComponents
    ) => Promise<ComponentChoice> = chooseComponent
  ): Promise<GenerateComponentResponse | string> {
    const availableComponents = await this.getAvailableComponents(
      this.componentList
    );

    const response = await callback(message, availableComponents);
    if (!response) {
      throw new Error("Failed to fetch component choice from backend");
    }

    if (response.componentName === null) {
      return response.message;
    }

    const componentEntry = this.componentList[response.componentName];

    if (!componentEntry) {
      throw new Error(
        `Hydra tried to use Component ${response.componentName}, but it was not found.`
      );
    }

    return {
      component: React.createElement(componentEntry.component, response.props),
      message: response.message,
    };
  }

  private getAvailableComponents = async (
    componentRegistry: ComponentRegistry
  ): Promise<AvailableComponents> => {
    // TODO: filter list to only include components that are relevant to user query

    const availableComponents: AvailableComponents = {};

    for (let name of Object.keys(componentRegistry)) {
      const componentEntry: RegisteredComponent = componentRegistry[name];
      availableComponents[name] = {
        name: componentEntry.name,
        description: componentEntry.description,
        props: componentEntry.props,
        context: {},
        // context: componentEntry.getComponentContext
        //   ? await componentEntry.getComponentContext()
        //   : {},
      };
    }

    return availableComponents;
  };
}

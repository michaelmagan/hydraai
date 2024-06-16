import React, { ComponentType, ReactElement } from "react";

interface ComponentRegistry {
  [key: string]: ComponentType<any>;
}

export class Hydra {
  private key: string;
  private componentList: ComponentRegistry = {};

  constructor(key: string) {
    this.key = key;
  }

  public registerComponent(name: string, component: ComponentType<any>): void {
    if (!this.componentList[name]) {
      this.componentList[name] = component;
    } else {
      throw new Error(`Component ${name} is already registered.`);
    }
  }

  public async generateComponent(message: string): Promise<ReactElement> {
    const context = { chatMessage: message };
    // const response = await callAI
    const response = {
      data: {
        componentName: "ChatMessage",
        props: {
          message: context.chatMessage,
        },
      },
    };

    const { componentName, props } = response.data;
    const component = this.componentList[componentName];

    if (!component) {
      throw new Error(`Component ${componentName} is not registered.`);
    }

    return React.createElement(component, props);
  }
}

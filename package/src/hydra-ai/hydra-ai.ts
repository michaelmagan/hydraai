import AIService from "./ai-service";
import ComponentRegistry from "./component-registry";
import { InputContext } from "./model/input-context";
import { ComponentType } from "react";
import { ComponentPropsMetadata } from "./model/component-props-metadata";
import { ComponentMetadata } from "./model/component-metadata";

export default class Hydra {
  private aiService: AIService;
  private componentRegistry: typeof ComponentRegistry;

  constructor(openAIKey: string, componentRegistry: typeof ComponentRegistry) {
    this.aiService = new AIService(openAIKey);
    this.componentRegistry = componentRegistry;
  }

  public registerComponent(
    name: string,
    component: ComponentType<any>,
    propsDefinition?: ComponentPropsMetadata
  ): void {
    if (!this.componentRegistry.get(name)) {
      this.componentRegistry.register(name, {
        component,
        props: propsDefinition || {},
      });
    } else {
      throw new Error(
        `A component with name: ${name} is already registered. Try another name.`
      );
    }
  }

  public async handleMessage(message: string): Promise<{
    componentName: string;
    explanation: string;
    component: ComponentType<any>;
    props: any;
  }> {
    const context: InputContext = {
      chatMessage: message,
      availableComponents: Object.entries(this.componentRegistry.getAll()).map(
        ([name, metadata]) => ({
          componentName: name,
          props: (metadata as ComponentMetadata).props,
        })
      ),
    };
    const componentChoice = await this.aiService.chooseComponent(context);
    const hydratedComponent = await this.hydrateComponent(
      componentChoice.componentName,
      message
    );
    const componentMetadata = this.componentRegistry.get(
      componentChoice.componentName
    );
    if (!componentMetadata) {
      throw new Error(
        `Component ${componentChoice.componentName} not found in registry`
      );
    }
    return {
      componentName: componentChoice.componentName,
      explanation: componentChoice.explanation,
      component: componentMetadata.component,
      props: hydratedComponent,
    };
  }

  async hydrateComponent(componentName: string, message: string): Promise<any> {
    const componentEntry = this.componentRegistry.get(componentName);

    if (!componentEntry) {
      throw new Error(
        `Hydra tried to use Component ${componentName}, but it was not found.`
      );
    }

    const context: InputContext = {
      chatMessage: message,
      availableComponents: Object.entries(this.componentRegistry.getAll()).map(
        ([name, metadata]) => ({
          componentName: name,
          props: (metadata as ComponentMetadata).props,
        })
      ),
    };

    const props = await this.aiService.hydrateComponent(context, componentName);

    return props;
  }
}

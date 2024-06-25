import { ComponentMetadata } from "./model/component-metadata";

class ComponentRegistry {
  private static instance: ComponentRegistry;
  private registry: { [key: string]: ComponentMetadata } = {};

  private constructor() {}

  public static getInstance(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry();
    }
    return ComponentRegistry.instance;
  }

  public register(key: string, metadata: ComponentMetadata): void {
    this.registry[key] = metadata;
  }

  public get(key: string): ComponentMetadata | undefined {
    return this.registry[key];
  }

  public getAll(): { [key: string]: ComponentMetadata } {
    return { ...this.registry };
  }
}

export default ComponentRegistry.getInstance();

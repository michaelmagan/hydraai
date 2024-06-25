import React, { ReactElement } from "react";
import ComponentRegistry from "./component-registry";

export default class ClientHydra {
  private componentRegistry: typeof ComponentRegistry;

  constructor(componentRegistry: typeof ComponentRegistry) {
    this.componentRegistry = componentRegistry;
  }

  public returnComponent(
    componentKey: string,
    props: any
  ): ReactElement | null {
    const componentMetadata = this.componentRegistry.get(componentKey);
    if (!componentMetadata) {
      console.error(`Component with key ${componentKey} not found in registry`);
      return null;
    }
    return React.createElement(componentMetadata.component, props);
  }
}

import { ReactElement } from "react";

export class Hydra {
  private key: string;
  private componentList: { [key: string]: ReactElement } = {};

  constructor(userKey: string, componentList: ReactElement[]) {
    this.key = userKey;
  }

  public registerComponent(component: ReactElement) {
    // something like: this.componentList[component.type] = component;
  }

  public async generateComponent(message: string): Promise<ReactElement> {
    //TODO: use ai to pick component
    const chosenComponentKey = "testComp";
    return this.componentList[chosenComponentKey];
  }
}

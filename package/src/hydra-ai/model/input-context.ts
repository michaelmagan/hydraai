export interface ComponentPropsMetadata {
  [key: string]: any;
}

export interface InputContext {
  chatMessage: string;
  availableComponents: {
    name: string;
    props: ComponentPropsMetadata;
  }[];
}

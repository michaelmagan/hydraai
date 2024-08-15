export interface ComponentChoice {
  componentName: string | null;
  props: any | null;
  message: string;
}

export interface ComponentDecision extends ComponentChoice {
  toolCallRequest?: ToolCallRequest;
}

export interface ToolCallRequest {
  toolName: string;
  parameters: {
    parameterName: string;
    parameterValue: any;
  }[];
}

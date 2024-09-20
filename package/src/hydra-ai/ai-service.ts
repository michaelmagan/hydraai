import "server-only"; // So this only runs on a server component.

import { OpenAI } from "openai";
import {
  ChatCompletion,
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ChatMessage } from "./model/chat-message";
import { ComponentDecision, ToolCallRequest } from "./model/component-choice";
import {
  AvailableComponent,
  ComponentContextToolMetadata,
} from "./model/component-metadata";
import { InputContext } from "./model/input-context";
import { OpenAIResponse } from "./model/openai-response";

const shouldGenerateComponentSchema = z.object({
  decision: z.boolean().describe("The decision to either generate a component or not"),
  reasoning: z.string().describe("The reasoning behind the decision"),
  componentName: z.string().optional().describe("The name of the chosen component if the decision is true"),
});

const generateSpecifiedComponentSchema = z.object({
  componentName: z.string().describe("The name of the chosen component"),
  props: z
    .object({})
    .passthrough()
    .describe(
      "The props that should be used in the chosen component. These will be injected by using React.createElement(component, props)"
    ),
  message: z
    .string()
    .describe(
      "The message to be displayed to the user alongside the chosen component. Depending on the component type, and the user message, this message might include a description of why a given component was chosen, and what can be seen within it, or what it does."
    ),
  reasoning: z.string().describe("The reasoning behind the decision"),
});

const noComponentGeneratedSchema = z.object({
  message: z.string().describe("The message to be displayed to the user."),
});

const defaultSystemInstructions = `You are a UI/UX designer that decides what component should be rendered based on what the user interaction is.`;

export default class AIService {
  client: OpenAI;
  model: string;
  systemInstructions: string;

  constructor(
    openAIKey: string,
    model: string = "gpt-4o",
    systemInstructions: string = defaultSystemInstructions
  ) {
    this.client = new OpenAI({
      apiKey: openAIKey,
    });
    this.model = model;
    this.systemInstructions = systemInstructions;
  }

  generateComponentSchema(
    component: ComponentContextToolMetadata
  ): z.ZodSchema<any> {
    const schema: { [key: string]: z.ZodTypeAny } = {};

    for (const param of component.parameters) {
      const { name, type, isRequired, description } = param;
      let zodType: z.ZodTypeAny;

      switch (type) {
        case 'string':
          zodType = z.string();
          break;
        case 'number':
          zodType = z.number();
          break;
        case 'boolean':
          zodType = z.boolean();
          break;
        case 'array':
          zodType = z.array(z.any());
          break;
        case 'object':
          zodType = z.object({}).passthrough();
          break;
        default:
          zodType = z.any();
      }

      schema[name] = isRequired ? zodType : zodType.optional();
      schema[description] = zodType.describe(description);
    }

    return z.object(schema);
  }

  chooseComponent = async (
    context: InputContext
  ): Promise<ComponentDecision> => {
    const componentNames = Object.keys(context.availableComponents);

    const decisionPrompt = `You are a simple AI assistant. Your goal is to output a boolean flag (true or false) indicating whether or not a UI component should be generated.
To accomplish your task, you will be given a list of available components and the existing message history.
First you will reason about whether you think a component should be generated. Reasoning should be a single sentence and output in the 'reasoning' json field.
Then you will output a boolean flag (true or false) in the 'decision' json field.
Finally, if you decide that a component should be generated, you will output the name of the component in the 'componentName' json field.`;

    const decisionResponse = await this.callOpenAI([
      {
        role: "system",
        content: decisionPrompt,
      },
      {
        role: "user",
        content: `<availableComponents>
           ${JSON.stringify(context.availableComponents)}
            </availableComponents>
            `,
      },
      ...this.chatHistoryToChatCompletionParam(context.messageHistory),
    ], shouldGenerateComponentSchema, "shouldGenerateComponentSchema");

    const parsedDecision = await this.parseAndReturnData(shouldGenerateComponentSchema, decisionResponse.message);
    const shouldGenerate = parsedDecision.decision;

    if (!shouldGenerate) {
      const reasoning = parsedDecision.reasoning;

      const messagePrompt = `You are an AI assistant that interacts with users and helps them perform tasks. You have determined that you cannot generate any components to help the user with their latest query for the following reason:
<reasoning>${reasoning}</reasoning>.
<availableComponents>
  ${componentNames.join(", ")}
</availableComponents>
Respond to the user's latest query to the best of your ability. If they have requested a task that you cannot help with, tell them so and recommend something you can help with.
This response should be short and concise.`;

      const messageResponse = await this.callOpenAI([
        {
          role: "system",
          content: messagePrompt,
        },
        ...this.chatHistoryToChatCompletionParam(context.messageHistory),
      ], noComponentGeneratedSchema, "noComponentGeneratedSchema");

      return {
        componentName: null,
        props: null,
        message: messageResponse.message,
      };
    } else if (shouldGenerate) {
      const componentName = parsedDecision.componentName;

      if (!componentName) {
        throw new Error("Invalid component name");
      }

      const component = context.availableComponents[componentName];

      if (!component) {
        throw new Error(`Component ${componentName} not found`);
      }

      return this.hydrateComponent(context.messageHistory, component);
    } else {
      // TODO: Handle this case. Maybe repeat the decision prompt.
      // Response did not contain a decision.
      throw new Error("No decision was made.");
    }
  };

  chatHistoryToChatCompletionParam(
    messageHistory: ChatMessage[]
  ): ChatCompletionMessageParam[] {
    return messageHistory.map((message) => ({
      role: message.sender == "user" ? "user" : "system",
      content: message.message,
    }));
  }

  async hydrateComponent(
    messageHistory: ChatMessage[],
    component: AvailableComponent,
    toolResponse?: any
  ): Promise<ComponentDecision> {
    const generateComponentPrompt = `You are an AI assistant that interacts with users and helps them perform tasks.
To help the user perform these tasks, you are able to generate UI components. You are able to display components and decide what props to pass in. However, you can not interact with, or control 'state' data.
When prompted, you will be given the existing conversation history, followed by the component to display, its description provided by the user, the shape of any props to pass in, and any other related context.
Use the conversation history and other provided context to determine what props to pass in.
${
  toolResponse
    ? `You have received a response from a tool. Use this data to help determine what props to pass in: ${JSON.stringify(
        toolResponse
      )}`
    : `You can also use any of the provided tools to fetch data needed to pass into the component.`
}`;

    const tools = toolResponse
      ? undefined
      : this.openAIToolFromMetadata(component.contextTools);

    const generateComponentResponse = await this.callOpenAI(
      [
        {
          role: "system",
          content: generateComponentPrompt,
        },
        ...this.chatHistoryToChatCompletionParam(messageHistory),
        {
          role: "user",
          content: `<componentName>${component.name}</componentName>
          <componentDescription>${JSON.stringify(
            component.description
          )}</componentDescription>
          <expectedProps>${JSON.stringify(component.props)}</expectedProps>
          ${
            toolResponse &&
            `<toolResponse>${JSON.stringify(toolResponse)}</toolResponse>`
          }`,
        },
      ],
      generateSpecifiedComponentSchema,
      "generateSpecifiedComponentSchema",
      tools
    );

    const componentDecision: ComponentDecision = {
      message: "Fetching additional data",
      componentName: component.name,
      props: null,
      toolCallRequest: generateComponentResponse.toolCallRequest,
    };

    if (!componentDecision.toolCallRequest) {
      const parsedData = await this.parseAndReturnData(
        generateSpecifiedComponentSchema,
        generateComponentResponse.message
      );

      componentDecision.componentName = parsedData.componentName;
      componentDecision.props = parsedData.props;
      componentDecision.message = parsedData.message;
    }

    return componentDecision;
  }

  async callOpenAI(
    messages: ChatCompletionMessageParam[],
    responseSchema: z.ZodSchema<any>,
    responseSchemaName: string,
    tools?: ChatCompletionTool[],
  ): Promise<OpenAIResponse> {
    let componentTools = tools;
    if (tools?.length === 0) {
      componentTools = undefined;
    }

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: messages,
      temperature: 0.1,
      response_format: zodResponseFormat(responseSchema, responseSchemaName),
      tools: componentTools,
    });

    const openAIResponse: OpenAIResponse = {
      message: response.choices[0].message.content || "",
    };

    if (
      response.choices[0].finish_reason === "function_call" ||
      response.choices[0].finish_reason === "tool_calls"
    ) {
      openAIResponse.toolCallRequest =
        this.toolCallRequestFromOpenaiResponse(response);
    }

    return openAIResponse;
  }

  async parseAndReturnData<T extends z.ZodTypeAny>(
    schema: T,
    text: string | object
  ): Promise<z.infer<T>> {
    try {
      let json;
      if (typeof text === "string") {
        json = text.trim();
        json = JSON.parse(json);
      } else {
        json = text;
      }
      const parsedData = await schema.parseAsync(json);
      return parsedData;
    } catch (e) {
      console.error(
        `Failed to parse. Text: "${
          typeof text === "string" ? text : JSON.stringify(text)
        }". Error: ${e}`
      );
      throw new Error(
        `Failed to parse. Text: "${
          typeof text === "string" ? text : JSON.stringify(text)
        }". Error: ${e}`
      );
    }
  }

  openAIToolFromMetadata(
    toolsMetadata: ComponentContextToolMetadata[]
  ): ChatCompletionTool[] {
    const tools: ChatCompletionTool[] = toolsMetadata.map((tool) => ({
      type: "function",
      function: {
        name: tool.name,
        description: tool.description,
        parameters: {
          type: "object",
          properties: {
            ...Object.fromEntries(
              tool.parameters.map((parameter) => {
                if (parameter.type === "enum") {
                  return [
                    parameter.name,
                    {
                      type: "string",
                      enum: parameter.enumValues || [],
                    },
                  ];
                } else if (parameter.type === "array") {
                  return [
                    parameter.name,
                    {
                      type: "array",
                      items: { type: parameter.items?.type || "string" },
                    },
                  ];
                } else {
                  return [parameter.name, { type: parameter.type }];
                }
              })
            ),
          },
          required: tool.parameters
            .filter((parameter) => parameter.isRequired)
            .map((parameter) => parameter.name),
          additionalProperties: false,
        },
      },
    }));

    return tools;
  }

  toolCallRequestFromOpenaiResponse = (
    response: ChatCompletion
  ): ToolCallRequest => {
    if (!response.choices[0].message.tool_calls) {
      throw new Error("No tool calls found in response");
    }
    const toolArgs = JSON.parse(
      response.choices[0].message.tool_calls[0].function.arguments
    );

    return {
      toolName: response.choices[0].message.tool_calls[0].function.name,
      parameters: [
        ...Object.entries(toolArgs).map(([key, value]) => ({
          parameterName: key,
          parameterValue: value,
        })),
      ],
    };
  };

}

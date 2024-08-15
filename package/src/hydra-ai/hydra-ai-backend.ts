import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "server-only";
import { registeredComponents } from "../db/schema";
import AIService from "./ai-service";
import { ComponentChoice } from "./model/component-choice";
import {
  AvailableComponents,
  ComponentContextToolMetadata,
} from "./model/component-metadata";
import { ComponentPropsMetadata } from "./model/component-props-metadata";
import { InputContext } from "./model/input-context";

export default class HydraBackend {
  private aiService: AIService;
  private dbConnection: NodePgDatabase;

  constructor(
    dbConnectionUrl: string,
    openAIKey: string,
    openAIModel = "gpt-4o"
  ) {
    const pool = new Pool({
      connectionString: dbConnectionUrl,
    });

    this.dbConnection = drizzle(pool);
    this.aiService = new AIService(openAIKey, openAIModel);
  }

  public async registerComponent(
    name: string,
    description: string,
    propsDefinition?: ComponentPropsMetadata,
    contextToolDefinitions?: ComponentContextToolMetadata[]
  ): Promise<boolean> {
    try {
      await this.dbConnection.insert(registeredComponents).values({
        name,
        description,
        prop_definitions: propsDefinition,
        // context_tools: contextToolDefinitions,
      });

      return true;
    } catch (error: any) {
      if (error.code === "23505") {
        // Component already registered in DB
        return true;
      }

      throw error;
    }
  }

  public async generateComponent(
    message: string,
    availableComponents: AvailableComponents
  ): Promise<ComponentChoice> {
    const context: InputContext = {
      prompt: message,
      availableComponents,
    };

    const componentChoice = await this.aiService.chooseComponent(context);

    return componentChoice;
  }
}

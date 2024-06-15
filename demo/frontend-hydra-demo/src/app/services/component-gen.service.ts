import { generateResponse } from "../../../actions/ai";
import { DynamicMessage } from "../model/dynamic-message";

export const generateDynamicMessage = async (
  message: string
): Promise<DynamicMessage> => {
  const response = await generateResponse("graph", message);
  return { message: message, type: "graph", componentData: exampleGraphData };
};

const exampleGraphData = {
  title: "Monthly Sales Data",
  description: "Sales data for the year 2024",
  titleClassName: "text-2xl",
  descriptionClassName: "description-class",
  dataClassName: "data-class",
  data: [
    { timestamp: "2024-01", value: 100 },
    { timestamp: "2024-02", value: 150 },
    { timestamp: "2024-03", value: 130 },
    { timestamp: "2024-04", value: 170 },
    { timestamp: "2024-05", value: 120 },
  ],
};
import { HydraClient } from "hydra-ai-backup";
import HydraPieChart from "./components/pie-chart";
import { getTransactions } from "./services/transactions-service";

const hydra = new HydraClient();

hydra.registerComponent(
  "HydraPieChart",
  HydraPieChart,
  {
    data: '{ name: "string", value: "number" }[]',
  },
  getTransactions
);

export default hydra;

import Hydra from "hydra-ai";
import CurrentWeather from "../components/current-weather";
import RainChart from "../components/rain-chart";

export const initHydra = (openAIKey: string) => {
  const hydra = new Hydra(openAIKey);

  hydra.registerComponent("CurrentWeather", CurrentWeather, {
    temperatureFahrenheit: "number",
    description: "string",
    weather: '"rain" | "sun" | "cloud" | "snow" | "clear"',
  });

  hydra.registerComponent("RainChart", RainChart, {
    data: "Array<{ hour: string; rainAmountInches: number }>",
  });

  return hydra;
};

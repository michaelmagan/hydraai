import Hydra from "hydra-ai";
import CurrentWeather from "../components/current-weather";

export const initHydra = (openAIKey: string) => {
  const hydra = new Hydra(openAIKey);

  hydra.registerComponent("CurrentWeather", CurrentWeather, {
    temperatureFahrenheit: "number",
    description: "string",
    weather: '"rain" | "sun" | "cloud" | "snow" | "clear"',
  });

  return hydra;
};

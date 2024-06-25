import { Hydra } from "hydra-ai-test";
import registry from "./register-components";

export const hydra = new Hydra(process.env.OPENAI_API_KEY ?? "", registry);

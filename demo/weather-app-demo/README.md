# Hydra-AI Weather App Demo

## Usage

### Steps

1. **Add your OpenAI Key**

Create a file called `.env.local` under `/src/`.

Add your OpenAI Key, like:

```bash
OPENAI_API_KEY=<your key>
```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## About

This app is a NextJS where the package is used from within server actions, and resulting components are sent to the frontend to be displayed in the chatbox.

under `src/app/services/hydra.ts` we register the components:

and under `src/app/services/component-gen.service.ts` we call hydra to generate components:

```jsx
"use server";

import Hydra from "hydra-ai";
import { ReactElement } from "react";
import { initHydra } from "./hydra";

let hydra: Hydra | null;

export const generateDynamicMessage = async (
  message: string
): Promise<ReactElement> => {
  if (!hydra) {
    hydra = initHydra(process.env.OPENAI_API_KEY ?? "");
  }
  const response = await hydra.generateComponent(message);
  return response;
};
```

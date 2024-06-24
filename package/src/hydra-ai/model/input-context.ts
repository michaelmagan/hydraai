import { z } from "zod";

export const ComponentPropsMetadata = z.any();
export const InputContext = z.object({
  chatMessage: z.string(),
  availableComponents: z.array(
    z.object({
      name: z.string(),
      props: ComponentPropsMetadata,
    })
  ),
});

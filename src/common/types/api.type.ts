import { createZodDto } from "nestjs-zod";
import z from "zod";

export const ApiSchema = z.object({
  id: z.uuid(),
  ownerId: z.uuid(),
  provider: z.enum(["custom", "mistral", "openai"]),
  providerUrl: z.url().nullable(),
  modelId: z.string(),
  apiKey: z.string(),
});

export class ApiDto extends createZodDto(ApiSchema) {}

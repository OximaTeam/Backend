import { createZodDto } from "nestjs-zod";
import { ApiSchema } from "src/common/types/api.type";
import z from "zod";

const PatchCustApiSchema = ApiSchema.pick({
  id: true,
  modelId: true,
  apiKey: true,
})
  .extend({
    provider: z.literal("custom"),
    providerUrl: z.url(),
  })
  .partial({
    modelId: true,
    apiKey: true,
    providerUrl: true,
  })
  .strict();

const PatchDefApiSchema = ApiSchema.pick({
  id: true,
  modelId: true,
  apiKey: true,
})
  .extend({
    provider: z.enum(["mistral", "openai"]),
  })
  .partial({
    modelId: true,
    apiKey: true,
  })
  .strict();

export const PatchApiSchema = z.discriminatedUnion("provider", [
  PatchCustApiSchema,
  PatchDefApiSchema,
]);

export class PatchDefApiDto extends createZodDto(PatchDefApiSchema) {}
export class PatchCustApiDto extends createZodDto(PatchCustApiSchema) {}

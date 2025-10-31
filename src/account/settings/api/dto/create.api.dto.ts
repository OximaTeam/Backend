import { createZodDto } from "nestjs-zod";
import { ApiSchema } from "src/common/types/api.type";
import z from "zod";

const CreateCustApiSchema = ApiSchema.pick({
  modelId: true,
  apiKey: true,
})
  .extend({
    provider: z.literal("custom"),
    providerUrl: z.url(),
  })
  .strict();

const CreateDefApiSchema = ApiSchema.pick({
  modelId: true,
  apiKey: true,
})
  .extend({
    provider: z.enum(["mistral", "openai"]),
  })
  .strict();

export const CreateApiSchema = z.discriminatedUnion("provider", [
  CreateCustApiSchema,
  CreateDefApiSchema,
]);

export class CreateCustApiDto extends createZodDto(CreateCustApiSchema) {}
export class CreateDefApiDto extends createZodDto(CreateDefApiSchema) {}

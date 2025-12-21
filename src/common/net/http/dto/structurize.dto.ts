import { createZodDto } from "nestjs-zod";
import { ApiSchema } from "src/common/types/api.type";
import { BlockSchema } from "src/common/types/blocks.type";
import z from "zod";

export class StructurizeDto extends createZodDto(
  z.object({
    noteId: BlockSchema.shape.noteId,
    additionalInstructions: z.string().optional(),
    providerUrl: ApiSchema.shape.providerUrl.optional(),
    provider: z.enum(["custom", "openai", "mistral", "oxima"]),
    modelId: ApiSchema.shape.modelId.optional(),
    apiKey: ApiSchema.shape.apiKey.optional(),
    blocks: BlockSchema.array(),
  })
) {}

export const RespStructurizeSchema = z.object({
  blocks: BlockSchema.pick({ type: true })
    .extend({ content: z.string() })
    .array(),
});

export class RespStructurizeDto extends createZodDto(RespStructurizeSchema) {}

import { createZodDto } from "nestjs-zod";
import { BlockSchema } from "src/common/types/blocks.type";
import z from "zod";

export const CreateBlockSchema = BlockSchema.omit({
  id: true,
  processed: true,
})
  .extend({
    processed: z.boolean().default(false),
  })
  .strict();

export class CreateBlockDto extends createZodDto(CreateBlockSchema) {}

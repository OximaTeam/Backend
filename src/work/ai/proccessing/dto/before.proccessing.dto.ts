import { createZodDto } from "nestjs-zod";
import { BlockSchema } from "src/common/types/blocks.type";
import z from "zod";

export const BeforeProccessSchema = BlockSchema.pick({ noteId: true }).extend({
  blocks: z.uuid().array(),
});
export class BeforeProccessDto extends createZodDto(BeforeProccessSchema) {}

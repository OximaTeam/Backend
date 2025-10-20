import { createZodDto } from "nestjs-zod";
import { BlockSchema } from "src/common/types/blocks.type";
import z from "zod";

export const DeleteBlockSchema = BlockSchema.pick({})
  .extend({
    id: z.uuid().array(),
    noteId: z.uuid(),
  })
  .strict();

export class DeleteBlockDto extends createZodDto(DeleteBlockSchema) {}

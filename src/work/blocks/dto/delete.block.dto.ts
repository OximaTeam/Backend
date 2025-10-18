import { createZodDto } from "nestjs-zod";
import { BlockSchema } from "src/common/types/blocks.type";

export const DeleteBlockSchema = BlockSchema.pick({
  id: true,
}).strict();

export class DeleteBlockDto extends createZodDto(DeleteBlockSchema) {}

import { createZodDto } from "nestjs-zod";
import { BlockSchema } from "src/common/types/blocks.type";

export const EditBlockSchema = BlockSchema.partial()
  .required({ id: true })
  .strict();

export class EditBlockDto extends createZodDto(EditBlockSchema) {}

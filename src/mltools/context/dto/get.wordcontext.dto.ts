import { createZodDto } from "nestjs-zod";
import { BlockSchema } from "src/common/types/blocks.type";
import z from "zod";

export const WordContextSchema = BlockSchema.pick({
  id: true,
  noteId: true,
})
  .extend({
    word: z.string(),
  })
  .strict();

export class WordContextDto extends createZodDto(WordContextSchema) {}

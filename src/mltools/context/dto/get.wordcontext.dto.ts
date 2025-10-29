import { createZodDto } from "nestjs-zod";
import { BlockSchema } from "src/common/types/blocks.type";
import z from "zod";

export const WordContextSchema = BlockSchema.pick({
  noteId: true,
})
  .extend({
    word: z.string(),
  })
  .strict();

export class WordContextDto extends createZodDto(WordContextSchema) {}

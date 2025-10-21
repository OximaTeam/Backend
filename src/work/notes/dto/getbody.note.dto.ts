import { createZodDto } from "nestjs-zod";
import { BlockSchema } from "src/common/types/blocks.type";
import { NoteSchema } from "src/common/types/notes.type";

export const BodyNoteSchema = NoteSchema.pick({
  id: true,
}).strict();

export class BodyNoteDto extends createZodDto(BodyNoteSchema) {}

export class ResponseBodyNoteDto extends createZodDto(BlockSchema.array()) {}

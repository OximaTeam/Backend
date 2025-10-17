import { createZodDto } from "nestjs-zod";
import { NoteSchema } from "src/common/types/notes.type";
import z from "zod";

export const CreateNoteSchema = NoteSchema.pick({
  parentId: true,
  name: true,
  blocksList: true,
}).strict();

export class ResponseCreateNotesSwagDto extends createZodDto(
  NoteSchema.omit({ createdAt: true, updatedAt: true }).extend({
    createdAt: z.string(),
    updatedAt: z.string(),
  })
) {}

export class CreateNotesDto extends createZodDto(CreateNoteSchema) {}

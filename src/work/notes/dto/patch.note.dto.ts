import { createZodDto } from "nestjs-zod";
import { NoteSchema } from "src/common/types/notes.type";

export const EditNoteSchema = NoteSchema.omit({
  createdAt: true,
  updatedAt: true,
  ownerId: true,
})
  .partial({ name: true })
  .strict();

export class EditNoteDto extends createZodDto(EditNoteSchema) {}

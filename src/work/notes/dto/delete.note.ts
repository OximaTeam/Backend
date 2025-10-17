import { createZodDto } from "nestjs-zod";
import { NoteSchema } from "src/common/types/notes.type";

export const DeleteNoteSchema = NoteSchema.pick({ id: true }).strict();

export class DeleteNoteDto extends createZodDto(DeleteNoteSchema) {}

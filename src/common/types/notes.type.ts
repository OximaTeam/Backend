import { createZodDto } from "nestjs-zod";
import z from "zod";

export const NoteSchema = z.object({
  id: z.uuid(),
  ownerId: z.uuid(),
  parentId: z.uuid().optional().nullable(),
  name: z.string().max(30, "Too long note's name!"),
  blocksList: z.uuid().array().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class NoteDto extends createZodDto(NoteSchema) {}

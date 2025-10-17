import { createZodDto } from "nestjs-zod";
import z from "zod";

export const FolderSchema = z.object({
  id: z.uuid(),
  name: z.string().max(30, "Too long folder's name!"),
  parentId: z.uuid().optional().nullable(),
  ownerId: z.uuid(),
});

export class FolderDto extends createZodDto(FolderSchema) {}

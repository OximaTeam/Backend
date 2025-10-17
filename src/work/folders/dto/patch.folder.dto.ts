import { createZodDto } from "nestjs-zod";
import { FolderSchema } from "src/common/types/folders.type";

export const EditFolderSchema = FolderSchema.omit({ ownerId: true })
  .partial({ name: true, parentId: true })
  .strict();

export class EditFolderDto extends createZodDto(EditFolderSchema) {}

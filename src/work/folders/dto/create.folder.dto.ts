import { createZodDto } from "nestjs-zod";
import { FolderSchema } from "src/common/types/folders.type";

export const CreateFolderSchema = FolderSchema.omit({
  id: true,
  ownerId: true,
}).strict();

export class CreateFolderDto extends createZodDto(CreateFolderSchema) {}

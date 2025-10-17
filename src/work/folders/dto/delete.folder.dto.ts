import { createZodDto } from "nestjs-zod";
import { FolderSchema } from "src/common/types/folders.type";

export const DeleteFolderSchema = FolderSchema.pick({ id: true }).strict();

export class DeleteFolderDto extends createZodDto(DeleteFolderSchema) {}

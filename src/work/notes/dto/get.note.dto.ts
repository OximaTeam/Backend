import { createZodDto } from "nestjs-zod";
import { NoteSchema } from "src/common/types/notes.type";

export const GetBlocksSchema = NoteSchema.pick({ id: true }).strict();

export class GetBlocksDto extends createZodDto(GetBlocksSchema) {}

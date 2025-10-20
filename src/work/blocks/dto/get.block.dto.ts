import { createZodDto } from "nestjs-zod";
import { BlockSchema } from "src/common/types/blocks.type";
import z from "zod";

export const GetContBlocksSchema = BlockSchema.pick({})
  .extend({
    noteId: z.uuid(),
    id: z.uuid().array(),
  })
  .strict();
export class ResponseGetContBlocksDto extends createZodDto(
  BlockSchema.array()
) {}

export class GetContBlocksDto extends createZodDto(GetContBlocksSchema) {}

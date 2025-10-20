import { createZodDto } from "nestjs-zod";
import { BlockSchema } from "src/common/types/blocks.type";
import z from "zod";

export const CountNearBlocksSchema = z
  .object({
    noteId: z.uuid(),
    blockId: z.uuid(),
    count: z.number().min(1),
  })
  .strict();

export class CountNearBlocksDto extends createZodDto(CountNearBlocksSchema) {}
export class ResponseCountNearBlocksDto extends createZodDto(
  BlockSchema.array()
) {}

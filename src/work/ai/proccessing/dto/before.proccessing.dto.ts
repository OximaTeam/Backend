import { createZodDto } from "nestjs-zod";
import {
  RespStructurizeDto,
  RespStructurizeSchema,
} from "src/common/net/http/dto/structurize.dto";
import { BlockSchema } from "src/common/types/blocks.type";
import z from "zod";

export const BeforeProccessSchema = BlockSchema.pick({ noteId: true }).extend({
  blocks: z.uuid().array().min(1, "At least one block is required"),
  additionalInstructions: z.string().optional(),
});
export class BeforeProccessDto extends createZodDto(BeforeProccessSchema) {}

export class RespBeforeProccessDto extends createZodDto(
  z.object({
    operationId: z.string(),
    blocks: RespStructurizeDto.schema,
  })
) {}

export class RedisSaveBlocksAi extends createZodDto(
  z.object({
    newBlocks: RespStructurizeSchema.shape.blocks,
    oldBlocks: z.uuid().array(),
    noteId: z.uuid(),
  })
) {}

import { createZodDto } from "nestjs-zod";
import { BlockSchema } from "src/common/types/blocks.type";
import z from "zod";

export const CheckStausSchema = z
  .object({
    operationId: z.string(),
    status: z.enum(["confirm", "reject"]),
  })
  .strict();

export class CheckStatusDto extends createZodDto(CheckStausSchema) {}

export class RespConfCheckStatusDto extends createZodDto(
  z.object({
    status: z.literal("confirm"),
    data: BlockSchema.array(),
  })
) {}

export class RespRejCheckStatusDto extends createZodDto(
  z.object({
    status: z.literal("reject"),
  })
) {}

import { createZodDto } from "nestjs-zod";
import { ApiSchema } from "src/common/types/api.type";
import z from "zod";

export class GetApisDto extends createZodDto(
  z.object({
    apis: ApiSchema.array(),
    defaultApiId: z.uuid().nullable(),
  })
) {}

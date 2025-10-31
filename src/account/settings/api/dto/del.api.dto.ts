import { createZodDto } from "nestjs-zod";
import { ApiSchema } from "src/common/types/api.type";

export const DelApiSchema = ApiSchema.pick({
  id: true,
});

export class DelApiDto extends createZodDto(DelApiSchema) {}

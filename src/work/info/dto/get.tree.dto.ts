import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const WorkTreeSchema = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(["folder", "note"]),
    children: z.array(WorkTreeSchema).optional(),
  })
);

export class WorkTreeDto extends createZodDto(z.array(WorkTreeSchema)) {}

export class WorkTreeDtoSwag extends createZodDto(WorkTreeSchema) {}

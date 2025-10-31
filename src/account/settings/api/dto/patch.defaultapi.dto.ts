import { createZodDto } from "nestjs-zod";
import { UserSchema } from "src/common/types/users.type";

export const PatchDefApiIdSchema = UserSchema.pick({
  defaultApiId: true,
})
  .required({ defaultApiId: true })
  .strict();

export class PatchDefApiIdDto extends createZodDto(PatchDefApiIdSchema) {}

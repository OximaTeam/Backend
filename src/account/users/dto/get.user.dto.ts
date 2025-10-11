import { createZodDto } from "nestjs-zod";
import { UserSchema } from "src/common/types/users.type";
import { z } from "zod";

export class ResponseGetUserSwagDto extends createZodDto(
  UserSchema.omit({ createdAt: true, password: true }).extend({
    createdAt: z.string(),
  })
) {}
export class ResponseGetUserDto extends createZodDto(
  UserSchema.omit({ password: true })
) {}

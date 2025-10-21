import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { UserSchema } from "src/common/types/users.type";
import { ApiExtraModels } from "@nestjs/swagger";

export const CreateUserSchema = UserSchema.pick({
  username: true,
  email: true,
  password: true,
}).strict();

const ResponseCreateUserSwag = z.object({
  user: UserSchema.omit({ createdAt: true, password: true }).extend({
    createdAt: z.string(),
  }),
  accessToken: z.jwt(),
});

const ResponseCreateUserSchema = z.object({
  user: UserSchema.omit({ password: true }),
  accessToken: z.jwt(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
export class ResponseCreateUserSwagDto extends createZodDto(
  ResponseCreateUserSwag
) {}
export class ResponseCreateUserDto extends createZodDto(
  ResponseCreateUserSchema
) {}

import { createZodDto } from "nestjs-zod";
import { UserSchema } from "src/common/types/users.type";
import z from "zod";

export const EditUserInfoSchema = UserSchema.omit({
  createdAt: true,
  id: true,
  password: true,
})
  .partial()
  .strict();

export const EditUserPwdSchema = UserSchema.pick({
  password: true,
}).extend({
  newPassword: z
    .string()
    .min(5, "Too short password!")
    .max(20, "Too long password!"),
});

export class ResponseEditUserInfoSwagDto extends createZodDto(
  z.object({
    user: UserSchema.omit({ password: true, createdAt: true }).extend({
      createdAt: z.string(),
    }),
    accessToken: z.jwt(),
  })
) {}
export class ResponseEditUserPwdSwagDto extends createZodDto(
  UserSchema.omit({ password: true, createdAt: true }).extend({
    createdAt: z.string(),
  })
) {}
export class EditUserPwdDto extends createZodDto(EditUserPwdSchema) {}
export class ResponseEditUserInfoDto extends createZodDto(
  z.object({
    user: UserSchema.omit({ password: true }),
    accessToken: z.jwt(),
  })
) {}
export class ResponseEditUserPwdDto extends createZodDto(
  UserSchema.omit({ password: true })
) {}

export class EditUserInfoDto extends createZodDto(EditUserInfoSchema) {}

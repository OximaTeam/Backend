import { createZodDto } from "nestjs-zod";
import { UserSchema } from "src/common/types/users.type";
import { z } from "zod";

export const LoginSchema = UserSchema.pick({ email: true, password: true });

const ResponseJwtSchema = z.object({
  accessToken: z.jwt(),
});

export class LoginDto extends createZodDto(LoginSchema) {}
export class ResponseJwtDto extends createZodDto(ResponseJwtSchema) {}
export class LoginJwtSign extends createZodDto(
  UserSchema.pick({ id: true, username: true, email: true })
) {}

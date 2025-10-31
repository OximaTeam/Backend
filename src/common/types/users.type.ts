import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.uuid(),
  username: z
    .string()
    .min(3, "Too short username!")
    .max(20, "Too long username"),
  email: z.email("Invalid email format!"),
  createdAt: z.date(),
  password: z
    .string()
    .min(5, "Too short password!")
    .max(20, "Too long password!"),
  defaultApiId: z.uuid().optional().nullable(),
});

export class UserDto extends createZodDto(UserSchema) {}

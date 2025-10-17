import { createZodDto } from "nestjs-zod";
import { UserSchema } from "src/common/types/users.type";

export const DeleteUserSchema = UserSchema.pick({ password: true }).strict();

export class DeleteUserDto extends createZodDto(DeleteUserSchema) {}

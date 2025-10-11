import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersCrud } from "./users.service";
import { AuthJwtService } from "../auth/jwt/jwt.service";
import { AuthJwtModule } from "../auth/jwt/jwt.module";
import { CheckPassword } from "src/common/services/checkPass.service";

@Module({
  imports: [AuthJwtModule],
  controllers: [UsersController],
  providers: [UsersCrud, AuthJwtService, CheckPassword],
})
export class UserModule {}

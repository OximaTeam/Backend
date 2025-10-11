import { Module } from "@nestjs/common";
import { AuthJwtModule } from "./jwt/jwt.module";
import { AuthController } from "./auth.controller";
import { AuthJwtService } from "./jwt/jwt.service";
import { CheckPassword } from "src/common/services/checkPass.service";

@Module({
  imports: [AuthJwtModule],
  controllers: [AuthController],
  providers: [AuthJwtService, CheckPassword],
  exports: [AuthJwtModule],
})
export class AuthModule {}

import { Module } from "@nestjs/common";
import { AuthJwtService } from "./jwt.service";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  providers: [AuthJwtService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthJwtModule {}

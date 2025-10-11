import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginJwtSign } from "./dto/login.dto";

@Injectable()
export class AuthJwtService {
  constructor(private jwtService: JwtService) {}

  async login(user: LoginJwtSign) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

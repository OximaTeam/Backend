import { Global, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { validatePass } from "../hash/reg.service";
import { UserDto } from "../types/users.type";

@Global()
@Injectable()
export class CheckPassword {
  constructor(private prisma: PrismaService) {}

  async check(email: string, password: string): Promise<UserDto> {
    const user = await this.prisma.users.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new UnauthorizedException("User doesn't exist!");
    }

    const isMatch = await validatePass(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid password!");
    }

    return user;
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { hashPass } from "../../common/hash/reg.service";
import { AuthJwtService } from "../auth/jwt/jwt.service";
import { EditUserInfoDto } from "./dto/patch.user.dto";

@Injectable()
export class UsersCrud {
  constructor(
    private prisma: PrismaService,
    private jwt: AuthJwtService
  ) {}

  async createUser(body: CreateUserDto) {
    const existing = await this.prisma.users.findUnique({
      where: { email: body.email },
    });
    if (existing) {
      throw new BadRequestException("User exists!");
    }
    const mapPass = await hashPass(body.password);
    const addUser = await this.prisma.users.create({
      data: {
        ...body,
        password: mapPass,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });
    const userJwt = await this.jwt.login(addUser);
    return {
      user: {
        ...addUser,
      },
      accessToken: userJwt.accessToken,
    };
  }

  async getUser(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException("User doesn't exist!");
    }
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.prisma.users.delete({ where: { id: id } });
    return;
  }

  async editUserInfo(id: string, body: EditUserInfoDto) {
    try {
      const user = await this.prisma.users.update({
        where: { id: id },
        data: body,
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
        },
      });

      const accessToken = await this.jwt.login(user);

      return {
        user: { ...user },
        accessToken: accessToken.accessToken,
      };
    } catch (e) {
      throw new UnauthorizedException("User doesn't exist!");
    }
  }

  async editUserPwd(id: string, pwd: string) {
    const hashedPass = await hashPass(pwd);
    return await this.prisma.users.update({
      where: { id: id },
      data: { password: hashedPass },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });
  }
}

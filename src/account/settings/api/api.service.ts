import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateCustApiDto, CreateDefApiDto } from "./dto/create.api.dto";
import { DelApiDto } from "./dto/del.api.dto";
import { PatchDefApiIdDto } from "./dto/patch.defaultapi.dto";
import { PatchCustApiDto, PatchDefApiDto } from "./dto/patch.api.dto";

@Injectable()
export class ApiService {
  constructor(private prisma: PrismaService) {}

  async createApi(ownerId: string, body: CreateCustApiDto | CreateDefApiDto) {
    return await this.prisma.api.create({
      data: {
        ownerId,
        ...body,
      },
    });
  }

  async delApi(ownerId: string, body: DelApiDto) {
    try {
      const api = await this.prisma.api.delete({
        where: {
          id: body.id,
          ownerId,
        },
      });
    } catch (e) {
      throw new NotFoundException("Api doesn't exist!");
    }
  }

  async editApi(ownerId: string, body: PatchCustApiDto | PatchDefApiDto) {
    try {
      return await this.prisma.api.update({
        where: {
          id: body.id,
          ownerId,
        },
        data: body,
      });
    } catch (e) {
      throw new NotFoundException("Api doesn't exist!");
    }
  }

  async getApis(ownerId: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: ownerId },
      select: {
        defaultApiId: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException("User doesn't exist!");
    }

    const apis = await this.prisma.api.findMany({
      where: {
        ownerId,
      },
    });

    return {
      apis: apis,
      defaultApiId: user.defaultApiId,
    };
  }

  async editDefApiId(ownerId: string, body: PatchDefApiIdDto) {
    try {
      return await this.prisma.users.update({
        where: {
          id: ownerId,
        },
        data: {
          defaultApiId: body.defaultApiId,
        },
      });
    } catch (e) {
      throw new UnauthorizedException("User doesn't exist!");
    }
  }
}

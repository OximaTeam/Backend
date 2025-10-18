import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateBlockDto } from "./dto/create.block.dto";
import { DeleteBlockDto } from "./dto/delete.block.dto";
import { GetContBlocksDto } from "./dto/get.block.dto";
import { EditBlockDto } from "./dto/patch.block.dto";

@Injectable()
export class BlocksService {
  constructor(private prisma: PrismaService) {}

  async createBlock(body: CreateBlockDto) {
    return await this.prisma.blocks.create({ data: body });
  }

  async deleteBlock(body: DeleteBlockDto) {
    try {
      await this.prisma.blocks.delete({ where: { id: body.id } });
    } catch (e) {
      throw new NotFoundException("Block doesn't exist!");
    }
  }

  async getBlocks(body: GetContBlocksDto) {
    return await this.prisma.blocks.findMany({
      where: {
        id: { in: body.id },
      },
    });
  }

  async editBlock(body: EditBlockDto) {
    try {
      return await this.prisma.blocks.update({
        where: {
          id: body.id,
        },
        data: body,
      });
    } catch (e) {
      throw new NotFoundException("Block doesn't exist!");
    }
  }
}

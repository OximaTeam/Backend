import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateBlockDto } from "./dto/create.block.dto";
import { DeleteBlockDto } from "./dto/delete.block.dto";
import { GetContBlocksDto } from "./dto/get.block.dto";
import { EditBlockDto } from "./dto/patch.block.dto";

@Injectable()
export class BlocksService {
  constructor(private prisma: PrismaService) {}

  async createBlock(ownerId: string, body: CreateBlockDto) {
    const owner = await this.prisma.notes.findUnique({
      where: { id: body.noteId },
      select: { ownerId: true },
    });
    if (!owner || owner.ownerId != ownerId) {
      throw new ForbiddenException("Not enough rights!");
    }
    return await this.prisma.blocks.create({ data: body });
  }

  async deleteBlock(ownerId: string, body: DeleteBlockDto) {
    const owner = await this.prisma.notes.findUnique({
      where: { id: body.noteId },
      select: { ownerId: true },
    });
    if (!owner || owner.ownerId != ownerId) {
      throw new ForbiddenException("Not enough rights!");
    }

    const result = await this.prisma.blocks.deleteMany({
      where: { id: { in: body.id }, noteId: body.noteId },
    });

    if (result.count === 0) {
      throw new NotFoundException("Block doesn't exist!");
    }
  }

  async getBlocks(ownerId: string, body: GetContBlocksDto) {
    const owner = await this.prisma.notes.findUnique({
      where: {
        id: body.noteId,
      },
      select: {
        ownerId: true,
      },
    });

    if (!owner || owner.ownerId != ownerId) {
      throw new ForbiddenException("Not enough rights!");
    }

    return await this.prisma.blocks.findMany({
      where: {
        id: { in: body.id },
        noteId: body.noteId,
      },
    });
  }

  async editBlock(ownerId: string, body: EditBlockDto) {
    const owner = await this.prisma.notes.findUnique({
      where: { id: body.noteId },
      select: { ownerId: true },
    });
    if (!owner || owner.ownerId != ownerId) {
      throw new ForbiddenException("Not enough rights!");
    }
    try {
      return await this.prisma.blocks.update({
        where: {
          id: body.id,
          noteId: body.noteId,
        },
        data: body,
      });
    } catch (e) {
      throw new NotFoundException("Block doesn't exist!");
    }
  }
}

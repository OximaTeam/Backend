import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CountNearBlocksDto } from "./dto/get.countnearblocks.dto";

@Injectable()
export class NearblocksService {
  constructor(private prisma: PrismaService) {}

  async getCountNearBlocks(body: CountNearBlocksDto) {
    const note = await this.prisma.notes.findUnique({
      where: {
        id: body.noteId,
      },
      select: {
        blocksList: true,
      },
    });

    if (!note) {
      throw new NotFoundException("Note doesn't exist!");
    }

    const positionBlock = note.blocksList.indexOf(body.blockId);

    if (positionBlock == -1) {
      throw new NotFoundException("Block's not in this note!");
    }

    const resList = note.blocksList.slice(
      Math.max(0, positionBlock - body.count),
      positionBlock
    );

    const blocks = await this.prisma.blocks.findMany({
      where: {
        id: { in: resList },
      },
    });

    const blocksMap = new Map(blocks.map((b) => [b.id, b]));

    return resList
      .map((id) => blocksMap.get(id))
      .filter((block) => block !== undefined);
  }
}

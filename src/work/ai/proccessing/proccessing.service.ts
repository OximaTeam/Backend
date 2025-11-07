import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { BeforeProccessDto } from "./dto/before.proccessing.dto";
import { Socket } from "socket.io";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class ProccessingService {
  constructor(private prisma: PrismaService) {}

  async createProccess(data: BeforeProccessDto, client: Socket) {
    const userId = (client as any).user.id;
    const note = await this.prisma.notes.findUnique({
      where: {
        id: data.noteId,
        ownerId: userId,
      },
    });

    if (!note) {
      throw new WsException("Note not found");
    }

    const blocks = await this.prisma.blocks.findMany({
      where: {
        id: { in: data.blocks },
        noteId: data.noteId,
      },
    });
  }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import {
  BeforeProccessDto,
  RedisSaveBlocksAi,
} from "./dto/before.proccessing.dto";
import { Socket } from "socket.io";
import { WsException } from "@nestjs/websockets";
import { nanoid } from "nanoid";
import { HttpServiceCust } from "src/common/net/http/http.service";
import { StructurizeDto } from "src/common/net/http/dto/structurize.dto";
import { RedisCacheService } from "src/common/net/redis/redis.service";
import { CheckStatusDto } from "./dto/check.proccess.dto";

@Injectable()
export class ProccessingService {
  constructor(
    private prisma: PrismaService,
    private http: HttpServiceCust,
    private redis: RedisCacheService
  ) {}

  async createProccess(data: BeforeProccessDto, client: Socket) {
    try {
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

      if (blocks.length === 0) {
        throw new WsException("Blocks not found");
      }

      if (blocks.length !== data.blocks.length) {
        throw new WsException(
          "Some blocks not found or don't belong to this note"
        );
      }

      const api = await this.prisma.users.findUnique({
        where: {
          id: userId,
        },
        select: {
          defaultApi: true,
        },
      });

      const operationId = `${userId}:${nanoid(5)}`;

      const structurizeBody: StructurizeDto = {
        noteId: data.noteId,
        additionalInstructions: data.additionalInstructions,
        provider: !api?.defaultApi ? "oxima" : api.defaultApi.provider,
        providerUrl: api?.defaultApi?.providerUrl,
        modelId: api?.defaultApi?.modelId,
        apiKey: api?.defaultApi?.apiKey,
        blocks: blocks,
      };

      const newBlocks = await this.http.structurizeBlocks(structurizeBody);

      await this.redis.set<RedisSaveBlocksAi>(operationId, {
        newBlocks: newBlocks.blocks,
        oldBlocks: data.blocks,
        noteId: data.noteId,
      });

      return {
        operationId: operationId,
        blocks: newBlocks,
      };
    } catch (e) {
      throw new WsException(e);
    }
  }

  async checkStatus(data: CheckStatusDto, client: Socket) {
    if (data.status == "confirm") {
      try {
        const redisData = await this.redis.get<RedisSaveBlocksAi>(
          data.operationId
        );

        if (!redisData) {
          throw new WsException("Operation doesn't exist!");
        }

        const deleteData = await this.prisma.blocks.deleteMany({
          where: {
            id: { in: redisData.oldBlocks },
          },
        });

        const createdBlocks = await Promise.all(
          redisData.newBlocks.map((block) =>
            this.prisma.blocks.create({
              data: {
                noteId: redisData.noteId,
                processed: true,
                content: block.content,
                type: block.type,
              },
            })
          )
        );
        const blocksList = createdBlocks.map((e) => e.id);

        const note = await this.prisma.notes.findUnique({
          where: { id: redisData.noteId },
          select: { blocksList: true },
        });

        if (!note) {
          throw new WsException("Note not found");
        }

        const newList = await this.prisma.notes.update({
          where: {
            id: redisData.noteId,
          },
          data: {
            blocksList: [
              ...note.blocksList.filter(
                (id) => !redisData.oldBlocks.includes(id)
              ),
              ...blocksList,
            ],
          },
        });

        await this.redis.del(data.operationId);

        return {
          status: "confirm" as const,
          data: createdBlocks,
        };
      } catch (e) {
        throw new WsException(e);
      }
    } else {
      await this.redis.del(data.operationId);
      return {
        status: "reject" as const,
      };
    }
  }
}

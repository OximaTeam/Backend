import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateNotesDto } from "./dto/create.note.dto";
import { EditNoteDto } from "./dto/patch.note.dto";

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async createNote(ownerId: string, body: CreateNotesDto) {
    return await this.prisma.notes.create({
      data: {
        ...body,
        ownerId: ownerId,
      },
    });
  }

  async getBlocks(ownerId: string, id: string) {
    const list = await this.prisma.notes.findUnique({
      where: {
        id: id,
        ownerId: ownerId,
      },
      select: {
        blocksList: true,
      },
    });

    if (!list) {
      throw new NotFoundException("Note doesn't exist!");
    }

    return list;
  }

  async deleteNote(ownerId: string, id: string) {
    try {
      await this.prisma.notes.delete({
        where: {
          id: id,
          ownerId: ownerId,
        },
      });
      return;
    } catch (e) {
      throw new NotFoundException("Note doesn't exist!");
    }
  }

  async editNote(ownerId: string, body: EditNoteDto) {
    try {
      return await this.prisma.notes.update({
        where: {
          id: body.id,
          ownerId: ownerId,
        },
        data: {
          ...body,
        },
      });
    } catch (e) {
      throw new NotFoundException("Note doesn't exist!");
    }
  }
}

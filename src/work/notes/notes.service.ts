import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateNotesDto } from "./dto/create.note.dto";
import { EditNoteDto } from "./dto/patch.note.dto";
import { BodyNoteDto } from "./dto/getbody.note.dto";

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async createNote(ownerId: string, body: CreateNotesDto) {
    if (body.parentId) {
      const parentFolder = await this.prisma.folders.findUnique({
        where: {
          id: body.parentId,
        },
      });
      if (!parentFolder) {
        throw new NotFoundException("Parent folder doesn't exist!");
      }
    }
    return await this.prisma.notes.create({
      data: {
        ...body,
        ownerId: ownerId,
      },
    });
  }

  async getNote(ownerId: string, id: string) {
    const note = await this.prisma.notes.findUnique({
      where: {
        id: id,
      },
    });

    if (!note) {
      throw new NotFoundException("Note doesn't exist!");
    }

    if (note.ownerId != ownerId) {
      throw new ForbiddenException("Not enough rights!");
    }

    return note;
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

  async getBody(ownerId: string, body: BodyNoteDto) {
    const owner = await this.prisma.notes.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!owner) {
      throw new NotFoundException("Note doesn't exist!");
    }

    if (owner.ownerId != ownerId) {
      throw new ForbiddenException("Not enough rights!");
    }

    const blocks = await this.prisma.blocks.findMany({
      where: {
        id: { in: owner.blocksList },
      },
    });

    const blocksMap = new Map(blocks.map((b) => [b.id, b]));

    return owner.blocksList
      .map((id) => blocksMap.get(id))
      .filter((block) => block !== undefined);
  }
}

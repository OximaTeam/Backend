import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateFolderDto } from "./dto/create.folder.dto";
import { EditFolderDto } from "./dto/patch.folder.dto";

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService) {}

  async createFolder(ownerId: string, body: CreateFolderDto) {
    return await this.prisma.folders.create({
      data: {
        ...body,
        ownerId: ownerId,
      },
    });
  }

  async deleteFolder(id: string, ownerId: string) {
    try {
      await this.prisma.folders.delete({
        where: {
          id: id,
          ownerId: ownerId,
        },
      });
      return;
    } catch (error) {
      throw new NotFoundException("Folder doesn't exist!");
    }
  }

  async editFolder(ownerId: string, body: EditFolderDto) {
    try {
      const folder = await this.prisma.folders.update({
        where: {
          id: body.id,
          ownerId: ownerId,
        },
        data: body,
      });
      return folder;
    } catch (error) {
      throw new NotFoundException("Folder doesn't exist!");
    }
  }
}

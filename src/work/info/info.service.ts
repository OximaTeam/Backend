import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class InfoService {
  constructor(private prisma: PrismaService) {}

  async getWorkTree(ownerId: string) {
    const folders = await this.prisma.folders.findMany({
      where: { ownerId: ownerId },
      select: { id: true, name: true, parentId: true },
      orderBy: { name: "asc" },
    });

    const notes = await this.prisma.notes.findMany({
      where: { ownerId: ownerId },
      select: { id: true, name: true, parentId: true },
      orderBy: { name: "asc" },
    });

    const byParent: Record<
      string | number,
      { id: string; name: string; type: "folder" | "note" }[]
    > = {};

    for (const folder of folders) {
      const parent = folder.parentId ?? 0;
      if (!byParent[parent]) byParent[parent] = [];
      byParent[parent].push({
        id: folder.id,
        name: folder.name,
        type: "folder",
      });
    }

    for (const note of notes) {
      const parent = note.parentId ?? 0;
      if (!byParent[parent]) byParent[parent] = [];
      byParent[parent].push({
        id: note.id,
        name: note.name,
        type: "note",
      });
    }

    function buildTree(parentId: string | number) {
      const children = byParent[parentId] || [];

      children.sort((a, b) =>
        a.name.localeCompare(b.name, ["en", "ru"], { sensitivity: "base" })
      );

      return children.map((item) => {
        if (item.type === "folder") {
          return {
            id: item.id,
            name: item.name,
            type: "folder",
            children: buildTree(item.id),
          };
        } else {
          return {
            id: item.id,
            name: item.name,
            type: "note",
          };
        }
      });
    }

    return buildTree(0);
  }
}

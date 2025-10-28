import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { WorkTreeDtoSwag } from "./dto/get.tree.dto";

@Injectable()
export class InfoService {
  constructor(private prisma: PrismaService) {}

  async getWorkTree(ownerId: string) {
    const folders = await this.prisma.folders.findMany({
      where: { ownerId },
      select: { id: true, name: true, parentId: true },
      orderBy: { name: "asc" },
    });

    const notes = await this.prisma.notes.findMany({
      where: { ownerId },
      select: { id: true, name: true, parentId: true },
      orderBy: { name: "asc" },
    });

    const nodes: Record<string, WorkTreeDtoSwag> = {};
    const parentMap = new Map<string, string | null>();

    for (const f of folders) {
      nodes[f.id] = { id: f.id, name: f.name, type: "folder", children: [] };
      parentMap.set(f.id, f.parentId);
    }

    for (const n of notes) {
      nodes[n.id] = { id: n.id, name: n.name, type: "note" };
      parentMap.set(n.id, n.parentId);
    }

    const roots: WorkTreeDtoSwag[] = [];

    for (const node of Object.values(nodes)) {
      const parentId = parentMap.get(node.id);
      if (parentId) {
        const parent = nodes[parentId];
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
}

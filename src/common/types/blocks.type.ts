import { createZodDto } from "nestjs-zod";
import z from "zod";

export const BlockSchema = z.object({
  id: z.uuid(),
  type: z.enum([
    "paragraph",
    "heading1",
    "heading2",
    "heading3",
    "heading4",
    "heading5",
    "unorderedList",
    "orderedList",
    "checkedList",
    "callout",
    "quote",
    "table",
    "separator",
    "image",
    "video",
    "audio",
    "file",
    "code",
    "math",
  ]),
  noteId: z.uuid(),
  content: z.any().nullable().optional(),
  processed: z.boolean(),
});

export class BlockDto extends createZodDto(BlockSchema) {}

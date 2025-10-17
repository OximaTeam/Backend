import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/account/auth/jwt/jwt.guard";
import { NotesService } from "./notes.service";
import {
  CreateNoteSchema,
  CreateNotesDto,
  ResponseCreateNotesSwagDto,
} from "./dto/create.note.dto";
import { ZodValidationPipe } from "src/common/pipes/ZodPipe";
import { NoteDto } from "src/common/types/notes.type";
import {
  GetBlocksDto,
  GetBlocksSchema,
  ResponseGetBlocksDto,
} from "./dto/getblocks.note.dto";
import { DeleteNoteDto, DeleteNoteSchema } from "./dto/delete.note";
import { EditNoteDto, EditNoteSchema } from "./dto/patch.note.dto";

@ApiBearerAuth("jwt")
@Controller("work/notes")
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private noteService: NotesService) {}

  @ApiOkResponse({ type: ResponseCreateNotesSwagDto })
  @Post("create")
  @UsePipes(new ZodValidationPipe(CreateNoteSchema))
  async createNote(@Req() req, @Body() body: CreateNotesDto): Promise<NoteDto> {
    return await this.noteService.createNote(req.user.id, body);
  }

  @ApiOkResponse({ type: ResponseGetBlocksDto })
  @Get("blocks")
  @UsePipes(new ZodValidationPipe(GetBlocksSchema))
  async getBlocks(
    @Req() req,
    @Body() body: GetBlocksDto
  ): Promise<ResponseGetBlocksDto> {
    return await this.noteService.getBlocks(req.user.id, body.id);
  }

  @Delete("delete")
  @UsePipes(new ZodValidationPipe(DeleteNoteSchema))
  async deleteNote(@Req() req, @Body() body: DeleteNoteDto) {
    return await this.noteService.deleteNote(req.user.id, body.id);
  }

  @ApiOkResponse({ type: ResponseCreateNotesSwagDto })
  @Patch("edit")
  @UsePipes(new ZodValidationPipe(EditNoteSchema))
  async editNote(@Req() req, @Body() body: EditNoteDto): Promise<NoteDto> {
    return await this.noteService.editNote(req.user.id, body);
  }
}

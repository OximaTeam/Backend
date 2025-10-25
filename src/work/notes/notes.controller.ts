import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiParam,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/account/auth/jwt/jwt.guard";
import { NotesService } from "./notes.service";
import {
  CreateNoteSchema,
  CreateNotesDto,
  ResponseCreateNotesSwagDto,
} from "./dto/create.note.dto";
import { ZodValidationPipe } from "src/common/pipes/ZodPipe";
import { NoteDto } from "src/common/types/notes.type";
import { GetBlocksDto, GetBlocksSchema } from "./dto/get.note.dto";
import { DeleteNoteDto, DeleteNoteSchema } from "./dto/delete.note";
import { EditNoteDto, EditNoteSchema } from "./dto/patch.note.dto";
import {
  BodyNoteDto,
  BodyNoteSchema,
  ResponseBodyNoteDto,
} from "./dto/getbody.note.dto";
import { ApiOkCust } from "src/common/decorators/formatapi.decorator";
import { BlockDto } from "src/common/types/blocks.type";
import { uuid } from "zod";

@ApiBearerAuth("jwt")
@ApiExtraModels(ResponseCreateNotesSwagDto, ResponseBodyNoteDto)
@Controller("work/notes")
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private noteService: NotesService) {}

  @ApiOkCust(ResponseCreateNotesSwagDto)
  @Post("create")
  @UsePipes(new ZodValidationPipe(CreateNoteSchema))
  async createNote(@Req() req, @Body() body: CreateNotesDto): Promise<NoteDto> {
    return await this.noteService.createNote(req.user.id, body);
  }

  @ApiOkCust(ResponseCreateNotesSwagDto)
  @ApiParam({ name: "id", type: uuid })
  @Get("info/:id")
  async getNote(
    @Req() req,
    @Param(new ZodValidationPipe(GetBlocksSchema)) param: GetBlocksDto
  ): Promise<NoteDto> {
    return await this.noteService.getNote(req.user.id, param.id);
  }

  @ApiOkResponse({
    schema: {
      type: "object",
      properties: {
        status: { type: "string", example: "success" },
      },
    },
  })
  @Delete("delete")
  @UsePipes(new ZodValidationPipe(DeleteNoteSchema))
  async deleteNote(@Req() req, @Body() body: DeleteNoteDto) {
    return await this.noteService.deleteNote(req.user.id, body.id);
  }

  @ApiOkCust(ResponseCreateNotesSwagDto)
  @Patch("edit")
  @UsePipes(new ZodValidationPipe(EditNoteSchema))
  async editNote(@Req() req, @Body() body: EditNoteDto): Promise<NoteDto> {
    return await this.noteService.editNote(req.user.id, body);
  }

  @ApiOkCust(BlockDto, true)
  @Post("body")
  @UsePipes(new ZodValidationPipe(BodyNoteSchema))
  async getBody(
    @Req() req,
    @Body() body: BodyNoteDto
  ): Promise<ResponseBodyNoteDto> {
    return await this.noteService.getBody(req.user.id, body);
  }
}

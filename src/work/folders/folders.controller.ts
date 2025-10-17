import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/account/auth/jwt/jwt.guard";
import { ZodValidationPipe } from "src/common/pipes/ZodPipe";
import { CreateFolderDto, CreateFolderSchema } from "./dto/create.folder.dto";
import { FolderDto } from "src/common/types/folders.type";
import { FoldersService } from "./folders.service";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { DeleteFolderDto, DeleteFolderSchema } from "./dto/delete.folder.dto";
import { EditFolderDto, EditFolderSchema } from "./dto/patch.folder.dto";

@ApiBearerAuth("jwt")
@Controller("work/folders")
@UseGuards(JwtAuthGuard)
export class FoldersController {
  constructor(private folderService: FoldersService) {}

  @ApiOkResponse({ type: FolderDto })
  @Post("create")
  @UsePipes(new ZodValidationPipe(CreateFolderSchema))
  async createFolder(
    @Req() req,
    @Body() body: CreateFolderDto
  ): Promise<FolderDto> {
    return await this.folderService.createFolder(req.user.id, body);
  }

  @Delete("delete")
  @UsePipes(new ZodValidationPipe(DeleteFolderSchema))
  async deleteFolder(@Req() req, @Body() body: DeleteFolderDto) {
    return await this.folderService.deleteFolder(body.id, req.user.id);
  }

  @ApiOkResponse({ type: FolderDto })
  @Patch("edit")
  @UsePipes(new ZodValidationPipe(EditFolderSchema))
  async editFolder(
    @Req() req,
    @Body() body: EditFolderDto
  ): Promise<FolderDto> {
    return await this.folderService.editFolder(req.user.id, body);
  }
}

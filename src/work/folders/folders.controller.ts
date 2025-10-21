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
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse } from "@nestjs/swagger";
import { DeleteFolderDto, DeleteFolderSchema } from "./dto/delete.folder.dto";
import { EditFolderDto, EditFolderSchema } from "./dto/patch.folder.dto";
import { ApiOkCust } from "src/common/decorators/formatapi.decorator";

@ApiBearerAuth("jwt")
@ApiExtraModels(FolderDto)
@Controller("work/folders")
@UseGuards(JwtAuthGuard)
export class FoldersController {
  constructor(private folderService: FoldersService) {}

  @ApiOkCust(FolderDto)
  @Post("create")
  @UsePipes(new ZodValidationPipe(CreateFolderSchema))
  async createFolder(
    @Req() req,
    @Body() body: CreateFolderDto
  ): Promise<FolderDto> {
    return await this.folderService.createFolder(req.user.id, body);
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
  @UsePipes(new ZodValidationPipe(DeleteFolderSchema))
  async deleteFolder(@Req() req, @Body() body: DeleteFolderDto) {
    return await this.folderService.deleteFolder(body.id, req.user.id);
  }

  @ApiOkCust(FolderDto)
  @Patch("edit")
  @UsePipes(new ZodValidationPipe(EditFolderSchema))
  async editFolder(
    @Req() req,
    @Body() body: EditFolderDto
  ): Promise<FolderDto> {
    return await this.folderService.editFolder(req.user.id, body);
  }
}

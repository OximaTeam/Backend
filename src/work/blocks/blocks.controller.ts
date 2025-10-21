import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/account/auth/jwt/jwt.guard";
import { BlocksService } from "./blocks.service";
import { BlockDto } from "src/common/types/blocks.type";
import { ZodValidationPipe } from "src/common/pipes/ZodPipe";
import { CreateBlockDto, CreateBlockSchema } from "./dto/create.block.dto";
import {
  GetContBlocksDto,
  GetContBlocksSchema,
  ResponseGetContBlocksDto,
} from "./dto/get.block.dto";
import { EditBlockDto, EditBlockSchema } from "./dto/patch.block.dto";
import { DeleteBlockDto, DeleteBlockSchema } from "./dto/delete.block.dto";
import { ApiOkCust } from "src/common/decorators/formatapi.decorator";

@ApiExtraModels(BlockDto)
@ApiBearerAuth("jwt")
@Controller("work/blocks")
@UseGuards(JwtAuthGuard)
export class BlocksController {
  constructor(private blocksService: BlocksService) {}

  @ApiOkCust(BlockDto)
  @Post("create")
  @UsePipes(new ZodValidationPipe(CreateBlockSchema))
  async createBlock(
    @Req() req,
    @Body() body: CreateBlockDto
  ): Promise<BlockDto> {
    return await this.blocksService.createBlock(req.user.id, body);
  }

  @ApiOkCust(BlockDto, true)
  @HttpCode(200)
  @Post("get")
  @UsePipes(new ZodValidationPipe(GetContBlocksSchema))
  async getBlocks(
    @Req() req,
    @Body() body: GetContBlocksDto
  ): Promise<ResponseGetContBlocksDto> {
    return await this.blocksService.getBlocks(req.user.id, body);
  }

  @ApiOkCust(BlockDto)
  @Patch("edit")
  @UsePipes(new ZodValidationPipe(EditBlockSchema))
  async editBlock(@Req() req, @Body() body: EditBlockDto): Promise<BlockDto> {
    return await this.blocksService.editBlock(req.user.id, body);
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
  @UsePipes(new ZodValidationPipe(DeleteBlockSchema))
  async deleteBlock(@Req() req, @Body() body: DeleteBlockDto) {
    return await this.blocksService.deleteBlock(req.user.id, body);
  }
}

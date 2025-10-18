import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
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

@ApiBearerAuth("jwt")
@Controller("work/blocks")
@UseGuards(JwtAuthGuard)
export class BlocksController {
  constructor(private blocksService: BlocksService) {}

  @ApiOkResponse({ type: BlockDto })
  @Post("create")
  @UsePipes(new ZodValidationPipe(CreateBlockSchema))
  async createBlock(@Body() body: CreateBlockDto): Promise<BlockDto> {
    return await this.blocksService.createBlock(body);
  }

  @ApiOkResponse({ type: ResponseGetContBlocksDto })
  @Get("get")
  @UsePipes(new ZodValidationPipe(GetContBlocksSchema))
  async getBlocks(
    @Body() body: GetContBlocksDto
  ): Promise<ResponseGetContBlocksDto> {
    return await this.blocksService.getBlocks(body);
  }

  @ApiOkResponse({ type: BlockDto })
  @Patch("edit")
  @UsePipes(new ZodValidationPipe(EditBlockSchema))
  async editBlock(@Body() body: EditBlockDto): Promise<BlockDto> {
    return await this.blocksService.editBlock(body);
  }

  @Delete("delete")
  @UsePipes(new ZodValidationPipe(DeleteBlockSchema))
  async deleteBlock(@Body() body: DeleteBlockDto) {
    return await this.blocksService.deleteBlock(body);
  }
}

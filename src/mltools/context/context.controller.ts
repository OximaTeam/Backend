import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { ContextService } from "./context.service";
import { MlGuard } from "src/common/guards/ml.guard";
import {
  CountNearBlocksDto,
  CountNearBlocksSchema,
  ResponseCountNearBlocksDto,
} from "./dto/get.countcontext.dto";
import { ApiExtraModels, ApiSecurity } from "@nestjs/swagger";
import { ZodValidationPipe } from "src/common/pipes/ZodPipe";
import { ApiOkCust } from "src/common/decorators/formatapi.decorator";
import { BlockDto } from "src/common/types/blocks.type";
import { WordContextDto, WordContextSchema } from "./dto/get.wordcontext.dto";

@ApiExtraModels(BlockDto)
@ApiSecurity("x-api-key")
@Controller("mltools/context")
@UseGuards(MlGuard)
export class ContextController {
  constructor(private contextService: ContextService) {}

  @ApiOkCust(BlockDto, true)
  @Post("nearblocks")
  @UsePipes(new ZodValidationPipe(CountNearBlocksSchema))
  async getCountNearBlocks(
    @Body() body: CountNearBlocksDto
  ): Promise<ResponseCountNearBlocksDto> {
    return await this.contextService.getCountNearBlocks(body);
  }

  @ApiOkCust(BlockDto, true)
  @Post("word")
  @UsePipes(new ZodValidationPipe(WordContextSchema))
  async getWordContext(
    @Body() body: WordContextDto
  ): Promise<ResponseCountNearBlocksDto> {
    return await this.contextService.getWordContext(body);
  }
}

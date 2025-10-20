import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { NearblocksService } from "./nearblocks.service";
import { MlGuard } from "src/common/guards/ml.guard";
import {
  CountNearBlocksDto,
  CountNearBlocksSchema,
  ResponseCountNearBlocksDto,
} from "./dto/get.countnearblocks.dto";
import { ApiOkResponse, ApiSecurity } from "@nestjs/swagger";
import { ZodValidationPipe } from "src/common/pipes/ZodPipe";

@ApiSecurity("x-api-key")
@Controller("mltools/nearblocks")
@UseGuards(MlGuard)
export class NearblocksController {
  constructor(private nearBlocksService: NearblocksService) {}

  @ApiOkResponse({ type: ResponseCountNearBlocksDto })
  @Post("count")
  @UsePipes(new ZodValidationPipe(CountNearBlocksSchema))
  async getCountNearBlocks(
    @Body() body: CountNearBlocksDto
  ): Promise<ResponseCountNearBlocksDto> {
    return await this.nearBlocksService.getCountNearBlocks(body);
  }
}

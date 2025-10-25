import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { InfoService } from "./info.service";
import { JwtAuthGuard } from "src/account/auth/jwt/jwt.guard";
import { ApiBearerAuth, ApiExtraModels } from "@nestjs/swagger";
import { WorkTreeDto, WorkTreeDtoSwag } from "./dto/get.tree.dto";
import { ApiOkCust } from "src/common/decorators/formatapi.decorator";

@ApiBearerAuth("jwt")
@ApiExtraModels(WorkTreeDtoSwag)
@Controller("work/info")
@UseGuards(JwtAuthGuard)
export class InfoController {
  constructor(private infoService: InfoService) {}

  @ApiOkCust(WorkTreeDtoSwag, true)
  @Get("tree")
  async getTree(@Req() req): Promise<WorkTreeDto> {
    return await this.infoService.getWorkTree(req.user.id);
  }
}

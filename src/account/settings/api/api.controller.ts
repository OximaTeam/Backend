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
import { ApiService } from "./api.service";
import { JwtAuthGuard } from "src/account/auth/jwt/jwt.guard";
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { ZodValidationPipe } from "src/common/pipes/ZodPipe";
import {
  CreateApiSchema,
  CreateCustApiDto,
  CreateDefApiDto,
} from "./dto/create.api.dto";
import { ApiDto } from "src/common/types/api.type";
import { ApiOkCust } from "src/common/decorators/formatapi.decorator";
import { DelApiDto, DelApiSchema } from "./dto/del.api.dto";
import {
  PatchApiSchema,
  PatchCustApiDto,
  PatchDefApiDto,
} from "./dto/patch.api.dto";
import { GetApisDto } from "./dto/get.apis.dto";
import {
  PatchDefApiIdDto,
  PatchDefApiIdSchema,
} from "./dto/patch.defaultapi.dto";
import { UserDto } from "src/common/types/users.type";
import { ResponseGetUserSwagDto } from "src/account/users/dto/get.user.dto";

@ApiBearerAuth("jwt")
@ApiExtraModels(
  ApiDto,
  DelApiDto,
  GetApisDto,
  ResponseGetUserSwagDto,
  CreateCustApiDto,
  CreateDefApiDto,
  PatchCustApiDto,
  PatchDefApiDto
)
@Controller("settings/api")
@UseGuards(JwtAuthGuard)
export class ApiController {
  constructor(private apiService: ApiService) {}

  @ApiOkCust(ApiDto)
  @ApiBody({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(CreateCustApiDto) },
        { $ref: getSchemaPath(CreateDefApiDto) },
      ],
    },
  })
  @Post("create")
  @UsePipes(new ZodValidationPipe(CreateApiSchema))
  async createApi(
    @Req() req,
    @Body() body: CreateCustApiDto | CreateDefApiDto
  ): Promise<ApiDto> {
    return await this.apiService.createApi(req.user.id, body);
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
  @UsePipes(new ZodValidationPipe(DelApiSchema))
  async delApi(@Req() req, @Body() body: DelApiDto) {
    return await this.apiService.delApi(req.user.id, body);
  }

  @ApiOkCust(ApiDto)
  @ApiBody({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(PatchCustApiDto) },
        { $ref: getSchemaPath(PatchDefApiDto) },
      ],
    },
  })
  @Patch("info")
  @UsePipes(new ZodValidationPipe(PatchApiSchema))
  async editApi(
    @Req() req,
    @Body() body: PatchCustApiDto | PatchDefApiDto
  ): Promise<ApiDto> {
    return await this.apiService.editApi(req.user.id, body);
  }

  @ApiOkCust(GetApisDto)
  @Get("all")
  async getApis(@Req() req): Promise<GetApisDto> {
    return await this.apiService.getApis(req.user.id);
  }

  @ApiOkCust(ResponseGetUserSwagDto)
  @Patch("default")
  @UsePipes(new ZodValidationPipe(PatchDefApiIdSchema))
  async editDefApiId(
    @Req() req,
    @Body() body: PatchDefApiIdDto
  ): Promise<UserDto> {
    return await this.apiService.editDefApiId(req.user.id, body);
  }
}

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
import { ZodValidationPipe } from "src/common/pipes/ZodPipe";
import {
  CreateUserSchema,
  CreateUserDto,
  ResponseCreateUserSwagDto,
  ResponseCreateUserDto,
} from "./dto/create.user.dto";
import { UsersCrud } from "./users.service";
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse } from "@nestjs/swagger";
import { ResponseGetUserDto, ResponseGetUserSwagDto } from "./dto/get.user.dto";
import { JwtAuthGuard } from "../auth/jwt/jwt.guard";
import { DeleteUserDto, DeleteUserSchema } from "./dto/delete.user.dto";
import { CheckPassword } from "src/common/services/checkPass.service";
import {
  EditUserInfoDto,
  EditUserInfoSchema,
  EditUserPwdDto,
  EditUserPwdSchema,
  ResponseEditUserInfoDto,
  ResponseEditUserInfoSwagDto,
  ResponseEditUserPwdDto,
  ResponseEditUserPwdSwagDto,
} from "./dto/patch.user.dto";
import { ApiOkCust } from "src/common/decorators/formatapi.decorator";

@ApiExtraModels(
  ResponseCreateUserSwagDto,
  ResponseGetUserSwagDto,
  ResponseEditUserInfoSwagDto,
  ResponseEditUserPwdSwagDto
)
@Controller("user")
export class UsersController {
  constructor(
    private serviceUsers: UsersCrud,
    private checkPass: CheckPassword
  ) {}

  @ApiOkCust(ResponseCreateUserSwagDto)
  @Post("create")
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async createUser(
    @Body() body: CreateUserDto
  ): Promise<ResponseCreateUserDto> {
    return await this.serviceUsers.createUser(body);
  }

  @ApiBearerAuth("jwt")
  @ApiOkCust(ResponseGetUserSwagDto)
  @Get("info")
  @UseGuards(JwtAuthGuard)
  async getInfoUser(@Req() req): Promise<ResponseGetUserDto> {
    return this.serviceUsers.getUser(req.user.id);
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
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(DeleteUserSchema))
  async deleteUser(@Req() req, @Body() body: DeleteUserDto) {
    const user = await this.checkPass.check(req.user.email, body.password);
    return await this.serviceUsers.deleteUser(user.id);
  }

  @ApiOkCust(ResponseEditUserInfoSwagDto)
  @Patch("info")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(EditUserInfoSchema))
  async editUserInfo(
    @Req() req,
    @Body() body: EditUserInfoDto
  ): Promise<ResponseEditUserInfoDto> {
    return await this.serviceUsers.editUserInfo(req.user.id, body);
  }

  @ApiOkCust(ResponseEditUserPwdSwagDto)
  @Patch("pwd")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(EditUserPwdSchema))
  async editUserPwd(
    @Req() req,
    @Body() body: EditUserPwdDto
  ): Promise<ResponseEditUserPwdDto> {
    const user = await this.checkPass.check(req.user.email, body.password);
    return await this.serviceUsers.editUserPwd(user.id, body.newPassword);
  }
}

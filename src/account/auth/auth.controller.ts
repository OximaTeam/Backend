import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { AuthJwtService } from "./jwt/jwt.service";
import { ZodValidationPipe } from "src/common/pipes/ZodPipe";
import { LoginDto, LoginSchema, ResponseJwtDto } from "./jwt/dto/login.dto";
import { CheckPassword } from "src/common/services/checkPass.service";
import { ApiOkCust } from "src/common/decorators/formatapi.decorator";
import { ApiExtraModels } from "@nestjs/swagger";

@ApiExtraModels(ResponseJwtDto)
@Controller("auth")
export class AuthController {
  constructor(
    private authJwtService: AuthJwtService,
    private checkPass: CheckPassword
  ) {}

  @Post("login")
  @ApiOkCust(ResponseJwtDto)
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() body: LoginDto): Promise<ResponseJwtDto> {
    const user = await this.checkPass.check(body.email, body.password);
    return this.authJwtService.login(user);
  }
}

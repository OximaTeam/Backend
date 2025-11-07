import { UseGuards, UsePipes } from "@nestjs/common";
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { JwtAuthGuard } from "src/account/auth/jwt/jwt.guard";
import { ZodValidationPipe } from "src/common/pipes/ZodPipe";
import {
  BeforeProccessDto,
  BeforeProccessSchema,
} from "./dto/before.proccessing.dto";
import { ProccessingService } from "./proccessing.service";

@WebSocketGateway({
  cors: true,
  namespace: "/proccessing",
})
export class Proccessing {
  constructor(private proccesService: ProccessingService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(BeforeProccessSchema))
  @SubscribeMessage("before")
  async createProccess(
    @MessageBody() data: BeforeProccessDto,
    @ConnectedSocket() client: Socket
  ) {
    return await this.proccesService.createProccess(data, client);
  }
}

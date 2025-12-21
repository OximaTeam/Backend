import {
  UseGuards,
  UseInterceptors,
  UsePipes,
  UseFilters,
} from "@nestjs/common";
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ZodValidationPipe } from "src/common/pipes/ZodPipe";
import {
  BeforeProccessDto,
  BeforeProccessSchema,
  RespBeforeProccessDto,
} from "./dto/before.proccessing.dto";
import { ProccessingService } from "./proccessing.service";
import { WsJwtGuard } from "src/common/guards/ws.guard";
import {
  CheckStatusDto,
  CheckStausSchema,
  RespConfCheckStatusDto,
  RespRejCheckStatusDto,
} from "./dto/check.proccess.dto";
import { WsExceptionFilter } from "src/common/filters/ws-exception.filter";

@UseFilters(new WsExceptionFilter())
@UseInterceptors()
@WebSocketGateway({
  cors: true,
  namespace: "/processing",
})
export class Proccessing implements OnGatewayConnection {
  constructor(private proccesService: ProccessingService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    client.emit("connected", {
      status: "success",
      message: "Successfully connected to processing service",
    });
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage("before")
  async createProccess(
    @MessageBody(new ZodValidationPipe(BeforeProccessSchema))
    data: BeforeProccessDto,
    @ConnectedSocket() client: Socket
  ) {
    return await this.proccesService.createProccess(data, client);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage("check")
  async checkStatus(
    @MessageBody(new ZodValidationPipe(CheckStausSchema)) data: CheckStatusDto,
    @ConnectedSocket() client: Socket
  ): Promise<RespConfCheckStatusDto | RespRejCheckStatusDto> {
    return await this.proccesService.checkStatus(data, client);
  }
}

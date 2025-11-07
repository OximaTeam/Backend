import { ExecutionContext, Injectable } from "@nestjs/common";
import { JwtAuthGuard } from "src/account/auth/jwt/jwt.guard";
import { Socket } from "socket.io";

@Injectable()
export class WsJwtGuard extends JwtAuthGuard {
  getRequest(context: ExecutionContext) {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake.auth.token;

    return {
      headers: { authorization: `Bearer ${token}` },
    };
  }
}

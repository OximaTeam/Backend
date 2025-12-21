import { ExecutionContext, Injectable } from "@nestjs/common";
import { JwtAuthGuard } from "src/account/auth/jwt/jwt.guard";
import { Socket } from "socket.io";
import { Observable } from "rxjs";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class WsJwtGuard extends JwtAuthGuard {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const client: Socket = context.switchToWs().getClient();

    if (err || !user) {
      throw new WsException("Unauthorized: Invalid or missing token");
    }

    (client as any).user = user;

    return user;
  }

  getRequest(context: ExecutionContext) {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake.headers.auth;

    if (!token) {
      throw new WsException("Unauthorized: No token provided");
    }

    return {
      headers: { authorization: `Bearer ${token}` },
    };
  }
}

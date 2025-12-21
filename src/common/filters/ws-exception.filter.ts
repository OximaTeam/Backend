import { Catch, ArgumentsHost } from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { ZodError } from "zod";

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    const data = host.switchToWs().getData();

    let errorResponse: any = {
      status: "error",
      message: "Unknown error occurred",
    };

    if (exception instanceof WsException) {
      const error = exception.getError();
      errorResponse = {
        status: "error",
        message:
          typeof error === "string" ? error : (error as any).message || error,
      };
    } else if (exception instanceof ZodError) {
      const errors: Record<string, string> = {};

      for (const issue of exception.issues) {
        const key = issue.path.length ? issue.path.join(".") : "_global";
        errors[key] = issue.message;
      }

      errorResponse = {
        status: "validation_error",
        message: "Validation failed",
        errors: errors,
      };
    } else if (exception instanceof Error) {
      errorResponse = {
        status: "error",
        message: exception.message,
      };
    }

    client.emit("exception", errorResponse);

    return;
  }
}

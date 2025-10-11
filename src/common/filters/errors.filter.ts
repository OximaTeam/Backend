import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ZodError } from "zod";
import { Request, Response } from "express";

@Catch()
export class ApiResponseFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: any = {
      status: "error",
      message: "Unknown error",
      code: statusCode,
    };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res = exception.getResponse();
      body = {
        ...body,
        status: "error",
        message: typeof res === "string" ? res : (res as any).message,
      };
    } else if (exception instanceof ZodError) {
      const errors: Record<string, string> = {};

      for (const issue of exception.issues) {
        const key = issue.path.length ? issue.path.join(".") : "_global";
        errors[key] = issue.message;
      }

      statusCode = HttpStatus.BAD_REQUEST;

      body = {
        status: "validation_error",
        code: statusCode,
        errors,
      };
    } else if (exception instanceof Error) {
      body = { status: "error", message: exception.message, code: statusCode };
    }

    response.status(statusCode).json(body);
  }
}

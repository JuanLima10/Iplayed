import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = isHttpException
      ? exception.getResponse()
      : 'Internal server error';

    console.error({
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      status,
      exception,
    });

    response.status(status).json({
      statusCode: status,
      error: isHttpException ? 'Request error' : 'Internal error',
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}

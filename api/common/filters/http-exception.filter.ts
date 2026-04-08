import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { DomainError } from 'common/errors/domain.error';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Domain Errors
    if (exception instanceof DomainError) {
      return response.status(exception.statusCode).json({
        type: `https://iplayed.dev/errors/${exception.type}`,
        title: exception.message,
        status: exception.statusCode,
        detail: exception.message,
        instance: request.url,
        timestamp: new Date().toISOString(),
      });
    }

    // Nest HttpException
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return response.status(status).json({
        type: `https://iplayed.dev/errors/http-exception`,
        title: exception.message,
        status,
        detail: exception.message,
        instance: request.url,
        timestamp: new Date().toISOString(),
      });
    }

    // Fallback
    return response.status(500).json({
      type: `https://iplayed.dev/errors/internal-server-error`,
      title: 'Internal server error',
      status: 500,
      detail: 'Unexpected error',
      instance: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}

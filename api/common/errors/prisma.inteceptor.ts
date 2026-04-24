import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AxiosError } from 'axios';
import { DomainError } from 'common/errors/domain.error';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
} from 'common/errors/http-status.error';
import { getErrorStack } from 'common/utils/error-stack.util';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class PrismaErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(PrismaErrorInterceptor.name);

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: unknown) => {
        if (error instanceof DomainError) {
          throw error;
        }

        if (error instanceof AxiosError) {
          const data = error.response?.data as
            | Record<string, unknown>
            | undefined;
          const headers = error.response?.headers as
            | Record<string, string>
            | undefined;

          const status = error.response?.status;
          const retryAfter = headers?.['retry-after'];
          const detail = (data?.error_description as string) ?? error.message;

          this.logger.error(
            `AxiosError [${status}] ${error.config?.url}: 
            ${detail} — retry-after: ${retryAfter ?? 'none'}`,
            getErrorStack(error),
          );

          if (status === 401) throw new UnauthorizedError(detail);
          if (status === 429)
            throw new TooManyRequestsError('External API rate limit exceeded');
          throw new InternalServerError(detail);
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          switch (error.code) {
            case 'P2025':
              throw new NotFoundError('Resource not found');

            case 'P2002':
              throw new BadRequestError('Unique constraint violation');

            default:
              this.logger.error(
                `Unhandled Prisma error: ${error.code}`,
                getErrorStack(error),
              );
              throw new InternalServerError();
          }
        }

        if (error instanceof Prisma.PrismaClientUnknownRequestError) {
          this.logger.error('Unknown Prisma error', getErrorStack(error));
          throw new InternalServerError();
        }

        this.logger.error('Unhandled application error', getErrorStack(error));

        throw new InternalServerError();
      }),
    );
  }
}

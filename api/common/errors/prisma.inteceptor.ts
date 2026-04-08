import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DomainError } from 'common/errors/domain.error';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
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

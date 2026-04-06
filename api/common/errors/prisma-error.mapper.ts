import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DomainError } from './domain.error';

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        throw new DomainError('Resource already exists', HttpStatus.CONFLICT);

      case 'P2025':
        throw new DomainError('Resource not found', HttpStatus.NOT_FOUND);
    }
  }

  throw new DomainError('Database error', HttpStatus.INTERNAL_SERVER_ERROR);
}

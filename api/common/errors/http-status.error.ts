import { HttpStatus } from '@nestjs/common';
import { DomainError } from './domain.error';

export class NotFoundError extends DomainError {
  constructor(message: string = 'Resource not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class ForbiddenError extends DomainError {
  constructor(message: string = 'Forbidden') {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class BadRequestError extends DomainError {
  constructor(message: string = 'Bad request') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message: string = 'Unauthorized') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class InternalServerError extends DomainError {
  constructor(message: string = 'Internal server error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

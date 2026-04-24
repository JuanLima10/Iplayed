import { HttpStatus } from '@nestjs/common';
import { DomainError } from './domain.error';

export class NotFoundError extends DomainError {
  constructor(message = 'Resource not found') {
    super(message, HttpStatus.NOT_FOUND, 'resource-not-found');
  }
}

export class BadRequestError extends DomainError {
  constructor(message = 'Bad request') {
    super(message, HttpStatus.BAD_REQUEST, 'bad-request');
  }
}

export class ConflictError extends DomainError {
  constructor(message = 'Conflict') {
    super(message, HttpStatus.CONFLICT, 'conflict');
  }
}

export class ForbiddenError extends DomainError {
  constructor(message = 'Forbidden') {
    super(message, HttpStatus.FORBIDDEN, 'forbidden');
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message = 'Unauthorized') {
    super(message, HttpStatus.UNAUTHORIZED, 'unauthorized');
  }
}

export class TooManyRequestsError extends DomainError {
  constructor(message = 'Too many requests') {
    super(message, HttpStatus.TOO_MANY_REQUESTS, 'to-many-requests');
  }
}

export class InternalServerError extends DomainError {
  constructor(message = 'Internal server error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, 'internal-server-error');
  }
}

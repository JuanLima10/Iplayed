import { HttpException, HttpStatus } from '@nestjs/common';

export class DomainError extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}

import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ISwagger } from 'common/interfaces/swagger.decorator.interface';

export function Swagger({
  summary,
  status,
  res: type,
  auth = true,
  array: isArray = false,
}: ISwagger) {
  const decorators = [
    ApiOperation({ summary }),
    ApiResponse({ status, type, isArray }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiForbiddenResponse({ description: 'Forbidden' }),
  ];

  if (auth) {
    decorators.unshift(ApiBearerAuth());
  }

  if (status !== 204) {
    decorators.push(ApiNotFoundResponse({ description: 'Resource not found' }));
  }

  return applyDecorators(...decorators);
}

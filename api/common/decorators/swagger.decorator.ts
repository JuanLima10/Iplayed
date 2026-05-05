import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ISwagger } from 'common/interfaces/swagger.decorator.interface';

export function Swagger({
  summary,
  status,
  res,
  auth = true,
  array = false,
}: ISwagger) {
  const decorators = [
    ApiOperation({ summary }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiForbiddenResponse({ description: 'Forbidden' }),
  ];

  if (auth) {
    decorators.unshift(ApiBearerAuth());
  }

  if (array) {
    if (!res) {
      throw new Error('Swagger `res` is required when `array` is true');
    }

    decorators.push(
      ApiExtraModels(res),
      ApiResponse({
        status,
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(res) },
            },
            paginate: {
              type: 'object',
              properties: {
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 10 },
                pages: { type: 'number', example: 1 },
                count: { type: 'number', example: 1 },
              },
            },
          },
        },
      }),
    );
  } else {
    decorators.push(
      ApiResponse({
        status,
        type: res,
      }),
    );
  }

  if (status !== 204) {
    decorators.push(ApiNotFoundResponse({ description: 'Resource not found' }));
  }

  return applyDecorators(...decorators);
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthRequest } from 'common/interfaces/auth.interface';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IAuthRequest>();
    return request.user;
  },
);

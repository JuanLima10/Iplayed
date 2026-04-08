import { applyDecorators, CanActivate, Type, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AccountOwnerGuard } from 'common/guards/account-owner.guard';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';

export function Auth(options?: { owner?: boolean }) {
  const guards: Array<Type<CanActivate>> = [JwtAuthGuard];

  if (options?.owner) {
    guards.push(AccountOwnerGuard);
  }

  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    UseGuards(...guards),
  );
}

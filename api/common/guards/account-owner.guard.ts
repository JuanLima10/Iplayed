import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { IAuthRequest } from 'common/interfaces/auth.interface';

@Injectable()
export class AccountOwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<IAuthRequest>();

    const userIdFromToken = request.user?.sub;
    const userIdFromParam = request.params?.id;

    if (!userIdFromParam) return true;

    if (userIdFromToken !== userIdFromParam) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }

    return true;
  }
}

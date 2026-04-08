import { IUserSelect, userSelect } from 'common/interfaces/user.interface';
import { PrismaMapper } from 'prisma/prisma.mapper';
import { ResponseUserDto } from './dto/response-user.dto';

export const UserMapper: PrismaMapper<IUserSelect, ResponseUserDto> = {
  select: userSelect,

  toResponse(this: void, user) {
    return {
      id: user.id,
      provider: user.provider,
      providerId: user.provider_id,
      username: user.username,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatar_url,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  },
};

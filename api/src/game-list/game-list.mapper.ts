import {
  IGameListSelect,
  gameListSelect,
} from 'common/interfaces/game-list.interface';
import { PrismaMapper } from 'prisma/prisma.mapper';
import { ResponseGameListDto } from './dto/response-game-list.dto';

export const GameListMapper: PrismaMapper<
  IGameListSelect,
  ResponseGameListDto
> = {
  select: gameListSelect,

  toResponse(this: void, list) {
    return {
      id: list.id,
      userId: list.user_id,
      name: list.name,
      createdAt: list.created_at,
      updatedAt: list.updated_at,
    };
  },
};

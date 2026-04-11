import {
  gameStatusSelect,
  IGameStatusSelect,
} from 'common/interfaces/game-status.interface';
import { PrismaMapper } from 'prisma/prisma.mapper';
import { ResponseGameStatusDto } from './dto/response-game-status.dto';

export const GameStatusMapper: PrismaMapper<
  IGameStatusSelect,
  ResponseGameStatusDto
> = {
  select: gameStatusSelect,

  toResponse(this: void, status) {
    return {
      id: status.id,
      userId: status.user_id,
      gameId: status.game_id,
      progress: status.progress,
      status: status.status,
      best: status.best,
      isFavorite: status.is_favorite,
      rating: status.rating,
      lastPlayedAt: status.last_played_at,
      createdAt: status.created_at,
      updatedAt: status.updated_at,
    };
  },
};

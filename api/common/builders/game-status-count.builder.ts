import { Prisma } from '@prisma/client';
import { verifyUUID } from 'common/utils/uuid-verify.util';

export function buildGameStatusCount(
  param?: string,
): Prisma.game_statusWhereInput {
  if (!param) return {};

  if (verifyUUID(param)) {
    return { user_id: param };
  }

  return { game: { slug: param } };
}

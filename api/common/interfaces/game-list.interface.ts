import { Prisma } from '@prisma/client';

export enum GameListOrderBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  NAME = 'name',
}

export const gameListSelect = {
  id: true,
  user_id: true,
  name: true,
  created_at: true,
  updated_at: true,
} satisfies Prisma.game_listSelect;

export type IGameListSelect = Prisma.game_listGetPayload<{
  select: typeof gameListSelect;
}>;

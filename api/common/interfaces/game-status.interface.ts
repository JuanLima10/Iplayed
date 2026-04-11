import { Prisma, progress_status } from '@prisma/client';
import { IGame } from './game.interface';

export enum GameStatusOrderBy {
  RATING = 'rating',
  PROGRESS = 'progress',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  LAST_PLAYED_AT = 'last_played_at',
}

export const statusCounts = [
  ['played', progress_status.COMPLETED],
  ['playing', progress_status.PLAYING],
  ['wantPlay', progress_status.TO_PLAY],
  ['abandoned', progress_status.ABANDONED],
] as const;

export interface IGameStatus {
  id: string;
  userId: string;
  gameId: string;
  progress: number | null;
  status: progress_status;
  best: number | null;
  isFavorite: boolean;
  rating: number | null;
  game: IGame;
  lastPlayedAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export const gameStatusSelect = {
  id: true,
  user_id: true,
  game_id: true,
  progress: true,
  status: true,
  best: true,
  is_favorite: true,
  rating: true,
  last_played_at: true,
  created_at: true,
  updated_at: true,
} satisfies Prisma.game_statusSelect;

export type IGameStatusSelect = Prisma.game_statusGetPayload<{
  select: typeof gameStatusSelect;
}>;

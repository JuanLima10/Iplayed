import { Prisma } from '@prisma/client';

export interface IGame {
  id: string;
  igdb_id: number | null;
  title: string;
  slug: string | null;
  created_at: Date;
  updated_at: Date | null;
}

export const gameSelect = {
  id: true,
  igdb_id: true,
  title: true,
  slug: true,
  cover_id: true,
  created_at: true,
  updated_at: true,
};
export type IGameSelect = Prisma.gameGetPayload<{
  select: typeof gameSelect;
}>;

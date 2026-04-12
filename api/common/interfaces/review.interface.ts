import { Prisma } from '@prisma/client';

export enum ReviewOrderBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  RATING = 'rating',
  POPULAR = 'popular',
}

export const reviewSelect = {
  id: true,
  user_id: true,
  game_id: true,
  text: true,
  created_at: true,
  updated_at: true,
} satisfies Prisma.reviewSelect;

export type IReviewSelect = Prisma.reviewGetPayload<{
  select: typeof reviewSelect;
}>;

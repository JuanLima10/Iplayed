import { Prisma } from '@prisma/client';

export const feedSelect = {
  id: true,
  user_id: true,
  type: true,
  payload: true,
  created_at: true,
} satisfies Prisma.feed_eventSelect;

export type IFeedSelect = Prisma.feed_eventGetPayload<{
  select: typeof feedSelect;
}>;

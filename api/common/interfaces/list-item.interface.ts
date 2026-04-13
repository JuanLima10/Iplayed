import { Prisma } from '@prisma/client';

export const listItemSelect = {
  id: true,
  list_id: true,
  game_id: true,
  position: true,
  added_at: true,
} satisfies Prisma.list_itemSelect;

export type IListItemSelect = Prisma.list_itemGetPayload<{
  select: typeof listItemSelect;
}>;

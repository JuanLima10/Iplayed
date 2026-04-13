import {
  IListItemSelect,
  listItemSelect,
} from 'common/interfaces/list-item.interface';
import { PrismaMapper } from 'prisma/prisma.mapper';
import { ResponseListItemDto } from './dto/response-list-item.dto';

export const ListItemMapper: PrismaMapper<
  IListItemSelect,
  ResponseListItemDto
> = {
  select: listItemSelect,

  toResponse(this: void, item) {
    return {
      id: item.id,
      listId: item.list_id,
      gameId: item.game_id,
      position: item.position,
      addedAt: item.added_at,
    };
  },
};

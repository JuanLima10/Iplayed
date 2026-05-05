import { feedSelect, IFeedSelect } from 'common/interfaces/feed.interface';
import { PrismaMapper } from 'prisma/prisma.mapper';
import { ResponseFeedDto } from './dto/response-feed.dto';

export const FeedMapper: PrismaMapper<IFeedSelect, ResponseFeedDto> = {
  select: feedSelect,

  toResponse(this: void, feed) {
    return {
      id: feed.id,
      userId: feed.user_id,
      type: feed.type,
      payload: feed.payload,
      createdAt: feed.created_at,
    };
  },
};

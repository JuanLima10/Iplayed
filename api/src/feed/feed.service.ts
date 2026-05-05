import { Injectable } from '@nestjs/common';
import { feed_event_type } from '@prisma/client';
import { buildPrismaQuery } from 'common/builders/prisma-query.builder';
import { NotFoundError } from 'common/errors/http-status.error';
import { normalizePaginate } from 'common/utils/paginate-normalize.util';
import { normalizeQuery } from 'common/utils/query-normalize';
import { PrismaService } from 'prisma/prisma.service';
import { UserMapper } from 'src/user/user.mapper';
import { FeedQueryDto as Params } from './dto/query-feed.dto';
import { FeedMapper } from './feed.mapper';

@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}

  async emit(user_id: string, type: feed_event_type, payload: object) {
    return this.prisma.feed_event.create({ data: { user_id, type, payload } });
  }

  async findAll(user_id?: string, filter?: Params) {
    const query = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;
    let where = {};

    if (user_id) {
      const follows = await this.prisma.follow.findMany({
        where: { follower_id: user_id },
        select: { following_id: true },
      });
      const following = follows.map(({ following_id }) => following_id);
      where = { user_id: { notIn: [...following, user_id] } };
    }

    const include = { user: true };
    const filters = buildPrismaQuery({ query, ...Params, where });

    const [count, feed] = await Promise.all([
      this.prisma.feed_event.count({ where: filters.where }),
      this.prisma.feed_event.findMany({ ...filters, include }),
    ]);

    const paginate = normalizePaginate({ page, limit, count });

    return { data: { feed, paginate } };
  }

  async findByFollow(user_id: string, filter?: Params) {
    const query = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const follows = await this.prisma.follow.findMany({
      where: { follower_id: user_id },
      select: { following_id: true },
    });
    const following = follows.map(({ following_id }) => following_id);

    const include = { user: true };
    const where = { user_id: { in: following } };
    const filters = buildPrismaQuery({ query, ...Params, where });

    const [count, feed] = await Promise.all([
      this.prisma.feed_event.count({ where: filters.where }),
      this.prisma.feed_event.findMany({ ...filters, include }),
    ]);

    const paginate = normalizePaginate({ page, limit, count });

    return { data: { feed, paginate } };
  }

  async findByUserId(id: string, filter?: Params) {
    const userExists = await this.prisma.user.findUnique({ where: { id } });
    if (!userExists) throw new NotFoundError('User not found');

    const query = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const where = { user_id: id };
    const include = { user: true };
    const filters = buildPrismaQuery({ query, ...Params, where });

    const [count, feeds] = await Promise.all([
      this.prisma.feed_event.count({ where: filters.where }),
      this.prisma.feed_event.findMany({ ...filters, include }),
    ]);

    const data = feeds.map(({ user, ...feed }) => ({
      ...FeedMapper.toResponse(feed),
      user: UserMapper.toResponse(user),
    }));

    const paginate = normalizePaginate({ page, limit, count });

    return { data, paginate };
  }
}

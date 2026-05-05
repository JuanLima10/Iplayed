import { Injectable } from '@nestjs/common';
import { buildPrismaQuery } from 'common/builders/prisma-query.builder';
import { ConflictError, NotFoundError } from 'common/errors/http-status.error';
import { normalizePaginate } from 'common/utils/paginate-normalize.util';
import { normalizeQuery } from 'common/utils/query-normalize';
import { PrismaService } from 'prisma/prisma.service';
import { UserMapper } from 'src/user/user.mapper';
import { QueryFollowDto } from './dto/query-follow.dto';

@Injectable()
export class FollowService {
  constructor(private readonly prisma: PrismaService) {}

  async findFollowers(user_id: string, filter?: QueryFollowDto) {
    const user = await this.prisma.user.findUnique({ where: { id: user_id } });
    if (!user) throw new NotFoundError('User not found');

    const query = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const where = { following_id: user.id };
    const filters = buildPrismaQuery({ query, ...QueryFollowDto, where });

    const [count, follows] = await Promise.all([
      this.prisma.follow.count({ where: filters.where }),
      this.prisma.follow.findMany({ ...filters, include: { follower: true } }),
    ]);

    const data = follows.map(({ follower }) => ({
      ...UserMapper.toResponse(follower),
    }));
    const paginate = normalizePaginate({ page, limit, count });

    return { data, paginate };
  }

  async findFollowing(user_id: string, filter?: QueryFollowDto) {
    const user = await this.prisma.user.findUnique({ where: { id: user_id } });
    if (!user) throw new NotFoundError('User not found');

    const query = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const where = { follower_id: user.id };
    const filters = buildPrismaQuery({ query, ...QueryFollowDto, where });

    const [count, follows] = await Promise.all([
      this.prisma.follow.count({ where: filters.where }),
      this.prisma.follow.findMany({ ...filters, include: { following: true } }),
    ]);

    const data = follows.map(({ following }) => ({
      ...UserMapper.toResponse(following),
    }));
    const paginate = normalizePaginate({ page, limit, count });

    return { data, paginate };
  }

  async follow(follower_id: string, user_id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: user_id },
    });
    if (!user) throw new NotFoundError('User not found');
    if (user.id === follower_id) {
      throw new ConflictError("You can't follow yourself");
    }

    const where = {
      follower_id_following_id: { follower_id, following_id: user.id },
    };
    const existing = await this.prisma.follow.findUnique({ where });
    if (existing) throw new ConflictError('Already following');

    const data = { follower_id, following_id: user.id };
    await this.prisma.follow.create({ data });

    return { following: true };
  }

  async unfollow(follower_id: string, user_id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: user_id },
    });
    if (!user) throw new NotFoundError('User not found');

    const where = { follower_id, following_id: user.id };
    const { count } = await this.prisma.follow.deleteMany({ where });
    if (!count) throw new NotFoundError('Not following this user');

    return { following: false };
  }
}

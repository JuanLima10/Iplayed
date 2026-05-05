import { Injectable } from '@nestjs/common';
import { buildPrismaQuery } from 'common/builders/prisma-query.builder';
import { ConflictError, NotFoundError } from 'common/errors/http-status.error';
import { normalizePaginate } from 'common/utils/paginate-normalize.util';
import { normalizeQuery } from 'common/utils/query-normalize';
import { PrismaService } from 'prisma/prisma.service';
import { UserMapper } from 'src/user/user.mapper';
import { QueryReviewLikeDto } from './dto/query-review-like.dto';

@Injectable()
export class ReviewLikeService {
  constructor(private readonly prisma: PrismaService) {}

  async findByReview(review_id: string, filter?: QueryReviewLikeDto) {
    const query = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const where = { review_id };
    const filters = buildPrismaQuery({ query, ...QueryReviewLikeDto, where });

    const [count, likes] = await Promise.all([
      this.prisma.review_like.count({ where: filters.where }),
      this.prisma.review_like.findMany({ ...filters, include: { user: true } }),
    ]);

    const data = likes.map(({ user }) => ({
      ...UserMapper.toResponse(user),
    }));
    const paginate = normalizePaginate({ page, limit, count });

    return { data, paginate };
  }

  async like(user_id: string, review_id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id: review_id },
    });
    if (!review) throw new NotFoundError('Review not found');

    const existing = await this.prisma.review_like.findUnique({
      where: { user_id_review_id: { user_id, review_id } },
    });
    if (existing) throw new ConflictError('Already liked');

    await this.prisma.review_like.create({ data: { user_id, review_id } });

    return { liked: true };
  }

  async unlike(user_id: string, review_id: string) {
    const { count } = await this.prisma.review_like.deleteMany({
      where: { user_id, review_id },
    });
    if (!count) throw new NotFoundError('Like not found');

    return { liked: false };
  }

  async count(review_id: string) {
    const likes = await this.prisma.review_like.count({ where: { review_id } });
    return { likes };
  }
}

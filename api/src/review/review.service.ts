import { Injectable } from '@nestjs/common';
import { buildPrismaQuery } from 'common/builders/prisma-query.builder';
import { IgdbClient } from 'common/clients/igdb.client';
import { NotFoundError } from 'common/errors/http-status.error';
import { extractCoverId } from 'common/utils/cover-id-extract.util';
import { resolveDateRange } from 'common/utils/date-range.util';
import { normalizePaginate } from 'common/utils/paginate-normalize.util';
import { normalizeQuery } from 'common/utils/query-normalize';
import { PrismaService } from 'prisma/prisma.service';
import { GameStatusMapper } from 'src/game-status/game-status.mapper';
import { GameMapper } from 'src/game/game.mapper';
import { UserMapper } from 'src/user/user.mapper';
import { CreateReviewDto } from './dto/create-review.dto';
import { QueryReviewDto, ReviewQuery } from './dto/query-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewMapper } from './review.mapper';

@Injectable()
export class ReviewService {
  constructor(
    private prisma: PrismaService,
    private igdb: IgdbClient,
  ) {}

  async findAll(filter?: QueryReviewDto) {
    const { isFavorite, rating, ...query } = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const filters = buildPrismaQuery({ query, ...ReviewQuery });
    const include = { user: true, game: { include: { statuses: true } } };
    if (rating !== undefined || isFavorite !== undefined) {
      filters.where.game = {
        statuses: { some: { rating, is_favorite: isFavorite } },
      };
    }

    const [count, reviews] = await Promise.all([
      this.prisma.review.count({ where: filters.where }),
      this.prisma.review.findMany({ ...filters, include }),
    ]);

    const data = reviews.map(({ game, user, ...review }) => ({
      ...ReviewMapper.toResponse(review),
      user: UserMapper.toResponse(user),
      game: GameMapper.toResponse(game),
      status:
        game.statuses?.[0] && GameStatusMapper.toResponse(game.statuses[0]),
    }));
    const paginate = normalizePaginate({ page, limit, count });

    return { data, paginate };
  }

  async findByUserId(user_id: string, filter?: QueryReviewDto) {
    const { isFavorite, rating, ...query } = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const where = { user_id };
    const filters = buildPrismaQuery({ query, ...ReviewQuery, where });
    const include = {
      user: true,
      game: { include: { statuses: { where: { user_id } } } },
    };

    if (rating !== undefined || isFavorite !== undefined) {
      filters.where.game = {
        statuses: { some: { user_id, rating, is_favorite: isFavorite } },
      };
    }

    const [count, reviews] = await Promise.all([
      this.prisma.review.count({ where: filters.where }),
      this.prisma.review.findMany({ ...filters, include }),
    ]);

    const data = reviews.map(({ game, user, ...review }) => ({
      ...ReviewMapper.toResponse(review),
      user: UserMapper.toResponse(user),
      game: GameMapper.toResponse(game),
      status:
        game.statuses?.[0] && GameStatusMapper.toResponse(game.statuses[0]),
    }));
    const paginate = normalizePaginate({ page, limit, count });

    return { data, paginate };
  }

  async findBySlug(slug: string, filter: QueryReviewDto) {
    const game = await this.prisma.game.findFirst({ where: { slug } });
    if (!game) throw new NotFoundError('Game not found');

    const { isFavorite, rating, ...query } = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const where = { game_id: game.id };
    const filters = buildPrismaQuery({ query, ...ReviewQuery, where });
    const include = { user: true, game: { include: { statuses: true } } };

    if (rating !== undefined || isFavorite !== undefined) {
      filters.where.game = {
        statuses: { some: { rating, is_favorite: isFavorite } },
      };
    }

    const [count, reviews] = await Promise.all([
      this.prisma.review.count({ where: filters.where }),
      this.prisma.review.findMany({ ...filters, include }),
    ]);

    const data = reviews.map(({ user, game, ...review }) => ({
      ...ReviewMapper.toResponse(review),
      user: UserMapper.toResponse(user),
      game: GameMapper.toResponse(game),
      status:
        game.statuses?.[0] && GameStatusMapper.toResponse(game.statuses[0]),
    }));
    const paginate = normalizePaginate({ page, limit, count });

    return { data, paginate };
  }

  async findMostByRange(query: QueryReviewDto) {
    const range = resolveDateRange(query);
    const { limit = 10 } = query;
    const where = { created_at: { gte: range?.start, lt: range?.end } };

    const grouped = await this.prisma.review.groupBy({
      by: ['game_id'],
      where,
      _count: { _all: true },
      orderBy: { _count: { game_id: 'desc' } },
      take: limit,
    });

    const id = { in: grouped.map((game) => game.game_id) };
    const games = await this.prisma.game.findMany({ where: { id } });

    const data = grouped.map(({ game_id, _count }) => ({
      game: GameMapper.toResponse(games.find(({ id }) => id === game_id)!),
      reviews: _count._all,
    }));

    return { data };
  }

  async upsert(user_id: string, dto: CreateReviewDto) {
    const { slug, text, isFavorite, lastPlayedAt, ...status } = dto;
    const formatted = { is_favorite: isFavorite, last_played_at: lastPlayedAt };

    const igdb = await this.igdb.getIgdbBySlug(slug);
    if (!igdb) throw new NotFoundError('Game not found');

    const cover_id = extractCoverId(igdb.cover?.url);
    const { id: game_id } = await this.prisma.game.upsert({
      where: { igdb_id: igdb.id },
      update: { slug: igdb.slug, cover_id },
      create: { igdb_id: igdb.id, title: igdb.name, slug: igdb.slug, cover_id },
    });

    await this.prisma.game_status.upsert({
      where: { user_id_game_id: { user_id, game_id } },
      update: { ...status, ...formatted },
      create: { ...status, ...formatted, user_id, game_id },
    });

    const review = await this.prisma.review.upsert({
      where: { user_id_game_id: { user_id, game_id } },
      update: { text },
      create: { text, user_id, game_id },
    });

    return ReviewMapper.toResponse(review);
  }

  async update(user_id: string, slug: string, dto: UpdateReviewDto) {
    const game = await this.prisma.game.findFirst({ where: { slug } });
    if (!game) throw new NotFoundError('Game not found');

    const data = { text: dto.text };
    const where = { user_id_game_id: { user_id, game_id: game.id } };
    const review = await this.prisma.review.update({ where, data });

    return ReviewMapper.toResponse(review);
  }

  async delete(user_id: string, slug: string) {
    const { count } = await this.prisma.review.deleteMany({
      where: { user_id, game: { slug } },
    });
    if (!count) throw new NotFoundError('Review not found');

    return { deleted: true };
  }
}

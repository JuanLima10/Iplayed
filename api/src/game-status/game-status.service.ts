import { Injectable } from '@nestjs/common';
import { buildGameStatusCount } from 'common/builders/game-status-count.builder';
import { buildPrismaQuery } from 'common/builders/prisma-query.builder';
import { IgdbClient } from 'common/clients/igdb.client';
import {
  BadRequestError,
  NotFoundError,
} from 'common/errors/http-status.error';
import {
  gameStatusSelect,
  statusCounts,
} from 'common/interfaces/game-status.interface';
import { extractCoverId } from 'common/utils/cover-id-extract.util';
import { normalizePaginate } from 'common/utils/paginate-normalize.util';
import { normalizeQuery } from 'common/utils/query-normalize';
import { PrismaService } from 'prisma/prisma.service';
import { GameMapper } from 'src/game/game.mapper';
import { CreateGameStatusDto } from './dto/create-game-status.dto';
import {
  GameStatusQuery,
  QueryGameStatusDto,
} from './dto/query-game-status.dto';
import { ResponseGameStatusDto } from './dto/response-game-status.dto';
import { UpdateGameStatusDto } from './dto/update-game-status.dto';
import { GameStatusMapper } from './game-status.mapper';

@Injectable()
export class GameStatusService {
  constructor(
    private prisma: PrismaService,
    private igdb: IgdbClient,
  ) {}

  async findByUserId(user_id: string, filter?: QueryGameStatusDto) {
    const query = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const where = { user_id };
    const filters = buildPrismaQuery({ query, ...GameStatusQuery, where });

    const [count, gameStatus] = await Promise.all([
      this.prisma.game_status.count({ where: filters.where }),
      this.prisma.game_status.findMany({
        ...filters,
        select: { ...gameStatusSelect, game: true },
      }),
    ]);

    const data = gameStatus.map(({ game, ...status }) => ({
      ...GameStatusMapper.toResponse(status),
      game: GameMapper.toResponse(game),
    }));
    const paginate = normalizePaginate({ page, limit, count });

    return { data, paginate };
  }

  async upsert(
    user_id: string,
    dto: CreateGameStatusDto,
  ): Promise<ResponseGameStatusDto> {
    if (dto.best) await this.countBest(user_id);

    const { igdbId: igdb_id, isFavorite, lastPlayedAt, ...data } = dto;
    const formatted = { is_favorite: isFavorite, last_played_at: lastPlayedAt };

    const igdb = await this.igdb.getIgdbById(igdb_id);
    if (!igdb) throw new NotFoundError('Game not found');

    const cover_id = extractCoverId(igdb.cover?.url);
    const { id: game_id } = await this.prisma.game.upsert({
      where: { igdb_id },
      update: { slug: igdb.slug, cover_id },
      create: { igdb_id, title: igdb.name, slug: igdb.slug, cover_id },
    });

    const status = await this.prisma.game_status.upsert({
      where: { user_id_game_id: { user_id, game_id } },
      update: { ...data, ...formatted },
      create: { ...data, ...formatted, user_id, game_id },
    });

    return GameStatusMapper.toResponse(status);
  }

  async update(user_id: string, slug: string, dto: UpdateGameStatusDto) {
    const { isFavorite, lastPlayedAt, ...data } = dto;

    const game = await this.prisma.game.findFirst({ where: { slug } });
    if (!game) throw new NotFoundError('Game not found');

    const status = await this.prisma.game_status.update({
      where: { user_id_game_id: { user_id, game_id: game.id } },
      data: { ...data, is_favorite: isFavorite, last_played_at: lastPlayedAt },
    });

    return GameStatusMapper.toResponse(status);
  }

  async count(param: string) {
    const baseWhere = buildGameStatusCount(param);

    const counts = await Promise.all(
      statusCounts.map(([, status]) =>
        this.prisma.game_status.count({ where: { ...baseWhere, status } }),
      ),
    );

    const [played, playing, wantPlay, abandoned] = counts;

    const [favorites, ratings] = await Promise.all([
      this.prisma.game_status.count({
        where: { ...baseWhere, is_favorite: true },
      }),
      this.prisma.game_status.count({
        where: { ...baseWhere, rating: { not: null } },
      }),
    ]);

    const data = { played, playing, wantPlay, abandoned, favorites, ratings };
    return { data };
  }

  async countBest(user_id: string) {
    const count = await this.prisma.game_status.count({
      where: { user_id, best: { not: null } },
    });
    if (count > 5) throw new BadRequestError('You can only have 5 best');
  }

  async delete(user_id: string, slug: string) {
    const where = { user_id, game: { slug } };
    const { count } = await this.prisma.game_status.deleteMany({ where });
    if (!count) throw new NotFoundError('Game status not found');

    return { deleted: true };
  }
}

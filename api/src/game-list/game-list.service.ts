import { Injectable } from '@nestjs/common';
import { buildPrismaQuery } from 'common/builders/prisma-query.builder';
import { ConflictError, NotFoundError } from 'common/errors/http-status.error';
import { normalizePaginate } from 'common/utils/paginate-normalize.util';
import { normalizeQuery } from 'common/utils/query-normalize';
import { PrismaService } from 'prisma/prisma.service';
import { GameMapper } from 'src/game/game.mapper';
import {
  ListItemQuery,
  QueryListItemDto,
} from 'src/list-item/dto/query-list-item.dto';
import { ListItemMapper } from 'src/list-item/list-item.mapper';
import { CreateGameListDto } from './dto/create-game-list.dto';
import { GameListQuery, QueryGameListDto } from './dto/query-game-list.dto';
import { UpdateGameListDto } from './dto/update-game-list.dto';
import { GameListMapper } from './game-list.mapper';

@Injectable()
export class GameListService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter?: QueryGameListDto) {
    const query = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const filters = buildPrismaQuery({ query, ...GameListQuery });
    const include = {
      items: {
        include: { game: true },
        orderBy: { position: 'asc' as const },
        take: 4,
      },
    };

    const [count, lists] = await Promise.all([
      this.prisma.game_list.count({ where: filters.where }),
      this.prisma.game_list.findMany({ ...filters, include }),
    ]);

    const data = lists.map(({ items, ...list }) => ({
      ...GameListMapper.toResponse(list),
      items: items.map(({ game, ...item }) => ({
        ...ListItemMapper.toResponse(item),
        game: GameMapper.toResponse(game),
      })),
    }));
    const paginate = normalizePaginate({ page, limit, count });

    return { data, paginate };
  }

  async findById(id: string, filter?: QueryListItemDto) {
    const query = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const list = await this.prisma.game_list.findUnique({ where: { id } });
    if (!list) throw new NotFoundError('List not found');

    const filters = buildPrismaQuery({ query, ...ListItemQuery });
    const where = { list_id: id, ...filters.where };
    const include = { game: true };

    const [count, items] = await Promise.all([
      this.prisma.list_item.count({ where }),
      this.prisma.list_item.findMany({ ...filters, where, include }),
    ]);

    const data = {
      ...GameListMapper.toResponse(list),
      items: items.map(({ game, ...item }) => ({
        ...ListItemMapper.toResponse(item),
        game: GameMapper.toResponse(game),
      })),
    };
    const paginate = normalizePaginate({ page, limit, count });

    return { data, paginate };
  }

  async findByUserId(user_id: string, filter?: QueryGameListDto) {
    const query = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const where = { user_id };
    const filters = buildPrismaQuery({ query, ...GameListQuery, where });
    const include = {
      items: {
        include: { game: true },
        orderBy: { position: 'asc' as const },
        take: 4,
      },
    };

    const [count, lists] = await Promise.all([
      this.prisma.game_list.count({ where: filters.where }),
      this.prisma.game_list.findMany({ ...filters, include }),
    ]);

    const data = lists.map(({ items, ...list }) => ({
      ...GameListMapper.toResponse(list),
      items: items.map(({ game, ...item }) => ({
        ...ListItemMapper.toResponse(item),
        game: GameMapper.toResponse(game),
      })),
    }));
    const paginate = normalizePaginate({ page, limit, count });

    return { data, paginate };
  }

  async create(user_id: string, dto: CreateGameListDto) {
    const { name } = dto;

    const where = { user_id_name: { user_id, name } };
    const exists = await this.prisma.game_list.findUnique({ where });
    if (exists) throw new ConflictError('list already exists');

    const data = { user_id, name };
    const list = await this.prisma.game_list.create({ data });

    return GameListMapper.toResponse(list);
  }

  async update(user_id: string, id: string, dto: UpdateGameListDto) {
    const { name } = dto;

    const list = await this.prisma.game_list.findUnique({
      where: { id, user_id },
    });
    if (!list) throw new NotFoundError('List not found');

    if (name && name !== list.name) {
      const where = { user_id_name: { user_id, name } };
      const exists = await this.prisma.game_list.findUnique({ where });
      if (exists) throw new ConflictError('List already exists');
    }

    const updated = await this.prisma.game_list.update({
      where: { id },
      data: { name },
    });

    return GameListMapper.toResponse(updated);
  }

  async delete(user_id: string, id: string) {
    const list = await this.prisma.game_list.findUnique({
      where: { id, user_id },
    });
    if (!list) throw new NotFoundError('List not found');

    await this.prisma.game_list.delete({ where: { id } });
    return { deleted: true };
  }
}

import { Injectable } from '@nestjs/common';
import { IgdbClient } from 'common/clients/igdb.client';
import { ConflictError, NotFoundError } from 'common/errors/http-status.error';
import { extractCoverId } from 'common/utils/cover-id-extract.util';
import { PrismaService } from 'prisma/prisma.service';
import { GameListService } from 'src/game-list/game-list.service';
import { GameMapper } from 'src/game/game.mapper';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { ReorderListItemsDto } from './dto/reorder-list-item.dto';
import { ListItemMapper } from './list-item.mapper';

@Injectable()
export class ListItemService {
  constructor(
    private prisma: PrismaService,
    private list: GameListService,
    private igdb: IgdbClient,
  ) {}

  async create(user_id: string, list_id: string, dto: CreateListItemDto) {
    const where = { id: list_id, user_id };
    const list = await this.prisma.game_list.findUnique({ where });
    if (!list) throw new NotFoundError('List not found');

    const igdb = await this.igdb.getIgdbBySlug(dto.slug);
    if (!igdb) throw new NotFoundError('Game not found');

    const cover_id = extractCoverId(igdb.cover?.url);
    const { id: game_id } = await this.prisma.game.upsert({
      where: { igdb_id: igdb.id },
      update: { slug: igdb.slug, cover_id },
      create: { igdb_id: igdb.id, title: igdb.name, slug: igdb.slug, cover_id },
    });

    const exists = await this.prisma.list_item.findUnique({
      where: { list_id_game_id: { list_id, game_id } },
    });
    if (exists) throw new ConflictError('Game already in this list');

    const maxPosition = await this.prisma.list_item.aggregate({
      where: { list_id },
      _max: { position: true },
    });
    const position = dto.position ?? (maxPosition._max.position ?? -1) + 1;

    const item = await this.prisma.list_item.create({
      data: { list_id, game_id, position },
      include: { game: true },
    });
    const { game, ...rest } = item;
    const data = {
      ...ListItemMapper.toResponse(rest),
      game: GameMapper.toResponse(game),
    };

    return { data };
  }

  async reorder(user_id: string, list_id: string, dto: ReorderListItemsDto) {
    const where = { id: list_id, user_id };
    const list = await this.prisma.game_list.findUnique({ where });
    if (!list) throw new NotFoundError('List not found');

    await this.prisma.$transaction(
      dto.items.map(({ itemId, position }) =>
        this.prisma.list_item.update({
          where: { id: itemId },
          data: { position },
        }),
      ),
    );

    return this.list.findById(list_id);
  }

  async delete(user_id: string, list_id: string, item_id: string) {
    const where = { id: list_id, user_id };
    const list = await this.prisma.game_list.findUnique({ where });
    if (!list) throw new NotFoundError('List not found');

    const { count } = await this.prisma.list_item.deleteMany({
      where: { id: item_id, list_id },
    });
    if (!count) throw new NotFoundError('Item not found in list');

    return { deleted: true };
  }
}

import { Injectable } from '@nestjs/common';
import { IgdbClient } from 'common/clients/igdb.client';
import { NotFoundError } from 'common/errors/http-status.error';
import { normalizePaginate } from 'common/utils/paginate-normalize.util';
import { normalizeQuery } from 'common/utils/query-normalize';
import { PrismaService } from 'prisma/prisma.service';
import { GameQueryDto } from './dto/query-game.dto';
import { ResponseGameDto } from './dto/response-game.dto';
import { GameMapper } from './game.mapper';

@Injectable()
export class GameService {
  constructor(
    private prisma: PrismaService,
    private igdb: IgdbClient,
  ) {}

  async findAll(filter?: GameQueryDto) {
    const query = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const { data: games, count } = await this.igdb.getIgdb(query);

    const data = games.map((game) => GameMapper.fromIgdb(game));
    const paginate = normalizePaginate({ page, limit, count });

    return { data, paginate };
  }

  async findByIgdbId(id: number): Promise<ResponseGameDto> {
    const igdbGame = await this.igdb.getIgdbById(id);
    if (!igdbGame) throw new NotFoundError('Game not found');

    return GameMapper.fromIgdb(igdbGame);
  }

  async findBySlug(slug: string): Promise<ResponseGameDto> {
    const igdbGame = await this.igdb.getIgdbBySlug(slug);
    if (!igdbGame) throw new NotFoundError('Game not found');

    // const game = await this.prisma.game.upsert({
    //   where: { igdb_id: igdbGame.id },
    //   update: {},
    //   create: {
    //     igdb_id: igdbGame.id,
    //     title: igdbGame.name,
    //     slug: igdbGame.slug,
    //   },
    // });

    return GameMapper.fromIgdb(igdbGame);
  }
}

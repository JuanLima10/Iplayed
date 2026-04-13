import { Injectable } from '@nestjs/common';
import { IgdbClient } from 'common/clients/igdb.client';
import { NotFoundError } from 'common/errors/http-status.error';
import { IPaginate as Paginate } from 'common/interfaces/paginate.util.interface';
import { normalizePaginate } from 'common/utils/paginate-normalize.util';
import { normalizeQuery } from 'common/utils/query-normalize';
import { GameQueryDto } from './dto/query-game.dto';
import { ResponseIgdbDto as Response } from './dto/response-igdb.dto';
import { IgdbMapper } from './game.mapper';

@Injectable()
export class GameService {
  constructor(private igdb: IgdbClient) {}

  async findAll(filter?: GameQueryDto): Promise<Paginate<Response>> {
    const query = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const { data: games, count } = await this.igdb.getIgdb(query);

    const data = games.map((game) => IgdbMapper.toResponse(game));
    const paginate = normalizePaginate({ page, limit, count });

    return { data, paginate };
  }

  async findByIgdbId(id: number): Promise<Response> {
    const igdb = await this.igdb.getIgdbById(id);
    if (!igdb) throw new NotFoundError('Game not found');

    return IgdbMapper.toResponse(igdb);
  }

  async findBySlug(slug: string): Promise<Response> {
    const igdb = await this.igdb.getIgdbBySlug(slug);
    if (!igdb) throw new NotFoundError('Game not found');

    return IgdbMapper.toResponse(igdb);
  }
}

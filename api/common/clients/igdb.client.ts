import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { buildIgdbQuery } from 'common/builders/igdb-query.builder';
import {
  IGameIgdb,
  IGDB_FIELDS_BASIC,
  IGDB_FIELDS_FULL,
  IQueryIgdb,
  IResponseIgdb,
} from 'common/interfaces/igdb.client.interface';
import { parseCountHeader } from 'common/utils/header-count-parser.util';

@Injectable()
export class IgdbClient {
  private client = axios.create({
    baseURL: 'https://api.igdb.com/v4',
    headers: {
      'Client-ID': process.env.IGDB_CLIENT_ID!,
      Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
    },
  });

  async getIgdb(query?: IQueryIgdb): Promise<IResponseIgdb> {
    const filters = buildIgdbQuery({ query, fields: IGDB_FIELDS_BASIC });
    const igdb = await this.client.post<IGameIgdb[]>('/games', filters);

    const { data, headers } = igdb;
    const count = parseCountHeader(headers);

    return { data, count };
  }

  async getIgdbById(id: number): Promise<IGameIgdb | undefined> {
    const where = `id = ${id}`;
    const query = buildIgdbQuery({ fields: IGDB_FIELDS_FULL, where });

    const { data } = await this.client.post<IGameIgdb[]>('/games', query);
    return data[0];
  }

  async getIgdbBySlug(slug: string): Promise<IGameIgdb | undefined> {
    const where = `slug = "${slug}"`;
    const query = buildIgdbQuery({ fields: IGDB_FIELDS_FULL, where });

    const { data } = await this.client.post<IGameIgdb[]>('/games', query);
    return data[0];
  }
}

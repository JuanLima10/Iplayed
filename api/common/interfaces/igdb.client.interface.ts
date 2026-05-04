import { IQuery } from './query.util.interface';

export enum IgdbOrderBy {
  SEARCH = 'search',
  POPULAR = 'popular',
  RATED = 'rated',
  RECENT = 'recent',
  AWAITED = 'awaited',
}

export interface IGames {
  id: number;
  name: string;
  slug: string;
  game_type?: { id: number; type: string };
  cover?: { url: string } | null;
}

export interface IGameIgdb {
  id: number;
  name: string;
  slug: string;
  summary?: string;
  storyline: string;
  first_release_date?: number;
  cover?: { url: string } | null;
  screenshots?: { url: string }[];
  artworks?: { url: string }[];
  videos?: IGameIgdbVideo[];
  total_rating?: number;
  total_rating_count?: number;
  game_type: { id: number; type: string };
  genres?: { id: number; name: string }[];
  themes?: { id: number; name: string }[];
  collections?: { id: number; games: IGames[] }[];
  dlcs?: IGames[];
  remakes?: IGames[];
  remasters?: IGames[];
  expansions?: IGames[];
  parent_game?: IGames;
  similar_games?: {
    id: number;
    name: string;
    slug: string;
    cover?: { url: string } | null;
  }[];
  involved_companies?: {
    publisher?: boolean;
    developer?: boolean;
    company: { name: string };
  }[];
}

export interface IGameIgdbVideo {
  id: number;
  name?: string;
  video_id: string;
}

export interface IResponseIgdb {
  data: IGameIgdb[];
  count: number;
}

export interface IGameIgdbQuery {
  query?: IQueryIgdb;
  fields: string;
  where?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface IQueryIgdb extends IQuery {
  orderBy?: IgdbOrderBy;
  releasedAfter?: string;
  releasedBefore?: string;
}

interface IPresetIgdb {
  where: string;
  sortBy: string;
  order: 'asc' | 'desc';
}

export const IGDB_FIELDS_BASIC =
  'fields id, name, slug, cover.url, first_release_date';

export const IGDB_FIELDS_FULL = `
  ${IGDB_FIELDS_BASIC},
  summary,
  storyline,
  game_type.type,
  screenshots.url,
  artworks.url,
  videos.name,
  videos.video_id,
  total_rating,
  total_rating_count,
  genres.name,
  themes.name,
  dlcs.slug,
  dlcs.name,
  dlcs.cover.url,
  remakes.slug,
  remakes.name,
  remakes.cover.url,
  remasters.slug,
  remasters.name,
  remasters.cover.url,
  expansions.slug,
  expansions.name,
  expansions.cover.url,
  parent_game.slug,
  parent_game.name,
  parent_game.cover.url,
  collections.games.slug,
  collections.games.name,
  collections.games.cover.url,
  collections.games.game_type.type,
  similar_games.name,
  similar_games.slug,
  similar_games.cover.url,
  involved_companies.publisher,
  involved_companies.developer,
  involved_companies.company.name
`;

export const IGDB_PRESETS = {
  [IgdbOrderBy.POPULAR]: {
    where: 'total_rating_count != null',
    sortBy: 'total_rating_count',
    order: 'desc',
  },
  [IgdbOrderBy.RATED]: {
    where: 'total_rating != null & aggregated_rating_count > 8',
    sortBy: 'total_rating',
    order: 'desc',
  },
  [IgdbOrderBy.RECENT]: {
    where: `first_release_date > ${Math.floor(new Date().getTime() / 1000)}`,
    sortBy: 'first_release_date',
    order: 'desc',
  },
  [IgdbOrderBy.AWAITED]: {
    where: `first_release_date > ${Math.floor(new Date().getTime() / 1000)} & hypes > 9`,
    sortBy: 'first_release_date',
    order: 'desc',
  },
} satisfies Record<Exclude<IgdbOrderBy, IgdbOrderBy.SEARCH>, IPresetIgdb>;

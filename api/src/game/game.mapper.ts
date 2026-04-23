import { gameSelect, IGameSelect } from 'common/interfaces/game.interface';
import { IGameIgdb } from 'common/interfaces/igdb.client.interface';
import { extractCompanies } from 'common/utils/companies-extract.util';
import { parseDate } from 'common/utils/date-parser.util';
import { mapImageIgdb, parseImageIgdb } from 'common/utils/image-parser.util';
import { extractVideoId } from 'common/utils/video-id-extract.util';
import { PrismaMapper } from 'prisma/prisma.mapper';
import { ResponseGameDto } from './dto/response-game.dto';
import { ResponseIgdbDto } from './dto/response-igdb.dto';

export const GameMapper: PrismaMapper<IGameSelect, ResponseGameDto> = {
  select: gameSelect,

  toResponse(this: void, game) {
    return {
      id: game.id,
      igdbId: game.igdb_id,
      title: game.title,
      slug: game.slug,
      coverUrl: parseImageIgdb(game.cover_id),
      createdAt: game.created_at,
      updatedAt: game.updated_at,
    };
  },
};

export const IgdbMapper = {
  toResponse(igdb: IGameIgdb): ResponseIgdbDto {
    const { publishers, developers } = extractCompanies(
      igdb.involved_companies,
    );

    return {
      igdbId: igdb.id,
      title: igdb.name,
      slug: igdb.slug,
      summary: igdb.summary,
      coverUrl: parseImageIgdb(igdb.cover?.url),
      releaseDate: parseDate(igdb.first_release_date),
      rating: igdb.rating,
      aggregatedRating: igdb.aggregated_rating,
      video: extractVideoId(igdb.videos),
      screenshots: mapImageIgdb(igdb.screenshots),
      artworks: mapImageIgdb(igdb.artworks),
      developers,
      publishers,
      genres: igdb.genres?.map((g) => g.name),
      themes: igdb.themes?.map((t) => t.name),
      similarGames: igdb.similar_games?.map((g) => ({
        igdbId: g.id,
        title: g.name,
        slug: g.slug,
        coverUrl: parseImageIgdb(g.cover?.url),
      })),
    };
  },
};

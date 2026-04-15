import { gameSelect, IGameSelect } from 'common/interfaces/game.interface';
import { IGameIgdb } from 'common/interfaces/igdb.client.interface';
import { extractCompanies } from 'common/utils/companies-extract.util';
import { parseDate } from 'common/utils/date-parser.util';
import { parseImageIgdb } from 'common/utils/image-parser.util';
import { parseYoutube } from 'common/utils/youtube-parser.util';
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
      video: parseYoutube(igdb.videos?.[igdb.videos.length - 1]?.video_id),
      screenshots: igdb.screenshots
        ?.map((img) => parseImageIgdb(img.url))
        .filter((img): img is string => Boolean(img)),
      artworks: igdb.artworks
        ?.map((img) => parseImageIgdb(img.url))
        .filter((img): img is string => Boolean(img)),
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

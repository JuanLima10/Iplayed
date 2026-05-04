import { IGameIgdb } from 'common/interfaces/igdb.client.interface';
import { parseImageIgdb } from './image-parser.util';

export function extractFranchises(
  franchises: IGameIgdb['collections'] | undefined,
  currentGameIgdbId: number,
) {
  if (!franchises?.length) return [];

  const map = new Map<
    number,
    {
      igdbId: number;
      title: string;
      slug: string;
      coverUrl?: string;
    }
  >();

  for (const franchise of franchises) {
    for (const game of franchise.games) {
      if (game.game_type && game.game_type.id !== 0) continue;
      if (game.id === currentGameIgdbId) continue;
      if (map.has(game.id)) continue;

      map.set(game.id, {
        igdbId: game.id,
        title: game.name,
        slug: game.slug,
        coverUrl: parseImageIgdb(game.cover?.url),
      });
    }
  }

  return Array.from(map.values());
}

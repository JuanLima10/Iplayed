import { IGameIgdb, IGames } from 'common/interfaces/igdb.client.interface';
import { parseImageIgdb } from './image-parser.util';

type GroupKey = 'dlcs' | 'expansions' | 'remakes' | 'remasters' | 'parent_game';

const GROUP_LABEL: Record<GroupKey, string> = {
  dlcs: 'DLC',
  expansions: 'Expansion',
  remakes: 'Remake',
  remasters: 'Remaster',
  parent_game: 'Main Game',
};

export function extractCollections(input: {
  dlcs?: IGameIgdb['dlcs'];
  expansions?: IGameIgdb['expansions'];
  remakes?: IGameIgdb['remakes'];
  remasters?: IGameIgdb['remasters'];
  parent_game?: IGameIgdb['parent_game'];
}) {
  const seen = new Set<number>();

  const normalized: Record<GroupKey, IGames[] | undefined> = {
    dlcs: input.dlcs,
    expansions: input.expansions,
    remakes: input.remakes,
    remasters: input.remasters,
    parent_game: input.parent_game ? [input.parent_game] : undefined,
  };

  return (Object.keys(GROUP_LABEL) as GroupKey[])
    .map((key) => {
      const games = normalized[key];
      if (!games?.length) return undefined;

      const mapped = games
        .filter((g) => {
          if (seen.has(g.id)) return false;
          seen.add(g.id);
          return true;
        })
        .map((game) => ({
          igdbId: game.id,
          title: game.name,
          slug: game.slug,
          coverUrl: parseImageIgdb(game.cover?.url),
        }));

      if (!mapped.length) return undefined;

      return {
        type: GROUP_LABEL[key],
        games: mapped,
      };
    })
    .filter((group): group is NonNullable<typeof group> => group != null)
    .sort((a, b) => b.type.localeCompare(a.type));
}

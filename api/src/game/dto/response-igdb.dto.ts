import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseIgdbDto {
  @ApiProperty({
    description: 'IGDB game id',
    example: '1341515',
  })
  igdbId!: number;

  @ApiProperty({
    description: 'Game title',
    example: 'The witcher 3: Wild hunter',
  })
  title!: string;

  @ApiProperty({
    description: 'IGDB game slug',
    example: 'the-witcher-3-wild-hunt',
  })
  slug!: string;

  @ApiPropertyOptional({
    description: 'IGDB game cover url',
    example: 'https://images.igdb.com/igdb/image/upload/t_1080p/coaarl.jpg',
  })
  coverUrl?: string;

  @ApiPropertyOptional({
    description: 'IGDB game summary',
    example:
      'The Witcher 3: Wild Hunt is an open-world action role-playing game developed by CD Projekt Red.\n\nSet in a dark fantasy world, the game follows Geralt of Rivia, a monster hunter searching for his adopted daughter, Ciri, while navigating political conflicts and supernatural threats. Gameplay features exploration, combat, character progression, and branching narratives shaped by player choices. Widely acclaimed for its writing, world-building, and depth, it is considered one of the most influential RPGs of its generation.',
  })
  summary?: string;

  @ApiPropertyOptional({
    description: 'Game release date',
    example: '2015-05-19T00:00:00.000Z',
  })
  releaseDate?: Date;

  @ApiPropertyOptional({
    description: 'Game screenshots',
    example: [
      'https://images.igdb.com/igdb/image/upload/t_1080p/farvemmmxav0bgt6wx7t.jpg',
      'https://images.igdb.com/igdb/image/upload/t_1080p/z5t0yuhyiiui1ickwhgj.jpg',
    ],
  })
  screenshots?: string[];

  @ApiPropertyOptional({
    description: 'Game artworks',
    example: [
      'https://images.igdb.com/igdb/image/upload/t_1080p/farvemmmxav0bgt6wx7t.jpg',
      'https://images.igdb.com/igdb/image/upload/t_1080p/z5t0yuhyiiui1ickwhgj.jpg',
    ],
  })
  artworks?: string[];

  @ApiPropertyOptional({
    description: 'Game video trailer',
    example: 'https://www.youtube.com/watch?v=yowv6_rspoM',
  })
  video?: string;

  @ApiPropertyOptional({
    description: 'Game rating',
    example: 5,
  })
  rating?: number;

  @ApiPropertyOptional({
    description: 'Game aggregated rating',
    example: 5,
  })
  aggregatedRating?: number;

  @ApiPropertyOptional({
    description: 'Publishers game',
    example: [
      'WB Games',
      'cdp.pl',
      'Spike Chunsoft',
      'Bandai Namco Entertainment',
    ],
  })
  publishers?: string[];

  @ApiPropertyOptional({
    description: 'Developers game',
    example: ['CD Projekt RED'],
  })
  developers?: string[];

  @ApiPropertyOptional({
    description: 'Genres game',
    example: ['Role-playing (RPG)', 'Adventure'],
  })
  genres?: string[];

  @ApiPropertyOptional({
    description: 'Themes game',
    example: ['Action', 'Fantasy', 'Open world'],
  })
  themes?: string[];

  @ApiPropertyOptional({
    description: 'Similar games',
    example: [
      {
        igdbId: 80,
        title: 'The Witcher',
        slug: 'the-witcher',
        coverUrl:
          'https://images.igdb.com/igdb/image/upload/t_1080p/co1xrx.jpg',
      },
      {
        igdbId: 478,
        title: 'The Witcher 2: Assassins of Kings',
        slug: 'the-witcher-2-assassins-of-kings',
        coverUrl:
          'https://images.igdb.com/igdb/image/upload/t_1080p/co1wy4.jpg',
      },
    ],
  })
  similarGames?: {
    igdbId: number;
    title: string;
    slug: string;
    coverUrl?: string;
  }[];
}

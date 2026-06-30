export enum GameOrderBy {
  'POPULAR' = 'popular',
  'RATING' = 'rated',
  'RELEASE_DATE' = 'recent',
  'SEARCH' = 'search',
  'AWAITED' = 'awaited',
}

export interface IGames {
  id?: string
  igdbId: number
  gameType?: string
  title: string
  slug: string
  coverUrl?: string
  releaseDate?: string
}

export interface IGame {
  igdbId: number
  gameType?: string
  title: string
  slug: string
  summary?: string
  storyline?: string
  coverUrl: string
  releaseDate: string
  rating?: number
  aggregatedRating?: number
  video?: string
  screenshots?: string[]
  artworks?: string[]
  developers?: string[]
  publishers?: string[]
  genres?: string[]
  themes?: string[]
  franchises?: IGames[]
  collections?: { type: string; games: IGames[] }[]
  similarGames?: IGames[]
}

export interface IGamePageParams {
  params: Promise<{ slug: string }>
}

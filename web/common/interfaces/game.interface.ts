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
  title: string
  slug: string
  coverUrl?: string
  releaseDate?: string
}

export interface IGame {
  igdbId: number
  title: string
  slug: string
  summary?: string
  coverUrl: string
  releaseDate: Date
  rating?: number
  aggregatedRating?: number
  video?: string
  screenshots?: string[]
  artworks?: string[]
  developers?: string[]
  publishers?: string[]
  genres?: string[]
  themes?: string[]
  similarGames?: IGames[]
}

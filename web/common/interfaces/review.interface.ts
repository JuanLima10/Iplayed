import { GameStatusProgress } from './game-status.interface'
import { IGames } from './game.interface'
import { IUser } from './user.interface'

export enum ReviewStatus {
  'PLAYING',
  'COMPLETED',
  'DROPPED',
  'BACKLOG',
}

export enum ReviewOrderBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  RATING = 'rating',
  POPULAR = 'popular',
}

export enum ReviewDateRange {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  CUSTOM = 'custom',
}

export interface IReview {
  id: string
  userId: string
  gameId: string
  text: string
  createdAt: string
  updatedAt: string
  game: IGames
  user: IUser
  status: {
    id: string
    userId: string
    gameId: string
    progress: number
    status: GameStatusProgress
    best: number
    isFavorite: boolean
    rating: number
    lastPlayedAt: string
    createdAt: string
    updatedAt: string
  }
  reviews?: number
}

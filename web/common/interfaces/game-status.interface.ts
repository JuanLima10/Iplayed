import {
  BookmarkCheck,
  Gamepad2,
  GamepadDirectional,
  ShieldX,
} from 'lucide-react'
import { IGames } from './game.interface'
import { IReview } from './review.interface'

export enum GameStatusProgress {
  TO_PLAY = 'TO_PLAY',
  PLAYING = 'PLAYING',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED',
}

export enum GameStatusDateRange {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  CUSTOM = 'custom',
}

export enum GameStatusOrderBy {
  BEST = 'best',
  RATING = 'rating',
  PROGRESS = 'progress',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  LAST_PLAYED_AT = 'last_played_at',
}

export interface IGameStatus {
  id: string
  userId: string
  gameId: string
  progress?: number | null
  status: GameStatusProgress
  best?: number | null
  isFavorite: boolean
  rating?: number | null
  lastPlayedAt?: string | null
  game?: IGames
  review?: IReview
  createdAt: string
  updatedAt?: string | null
}

export interface IGameStatusMost {
  game: IGames
  status: number
}

export interface IGameStatusCount {
  played: string
  playing: string
  wantPlay: string
  abandoned: string
  favorites: string
  ratings: string
  reviews: string
}

export interface IGameStatusItem {
  key: keyof IGameStatusCount
  label: string
}

export interface IGameStatusRating {
  avg: number
  ratings: { stars: number; value: number }[]
}

export const StatusProgressLabel: Record<GameStatusProgress, string> = {
  [GameStatusProgress.TO_PLAY]: 'Wish play',
  [GameStatusProgress.PLAYING]: 'Playing',
  [GameStatusProgress.COMPLETED]: 'Completed',
  [GameStatusProgress.ABANDONED]: 'Abandoned',
}

export const StatusProgressIcon: Record<GameStatusProgress, React.ElementType> =
  {
    [GameStatusProgress.TO_PLAY]: GamepadDirectional,
    [GameStatusProgress.PLAYING]: Gamepad2,
    [GameStatusProgress.COMPLETED]: BookmarkCheck,
    [GameStatusProgress.ABANDONED]: ShieldX,
  }

export const StatusProgressColor: Record<GameStatusProgress, string> = {
  [GameStatusProgress.TO_PLAY]:
    'data-[state=off]:text-secondary data-[state=on]:text-background data-[state=on]:bg-secondary',
  [GameStatusProgress.PLAYING]:
    'data-[state=off]:text-primary data-[state=on]:text-background data-[state=on]:bg-primary',
  [GameStatusProgress.COMPLETED]:
    'data-[state=off]:text-chart-3 data-[state=on]:text-background data-[state=on]:bg-chart-3',
  [GameStatusProgress.ABANDONED]:
    'data-[state=off]:text-destructive data-[state=on]:text-background data-[state=on]:bg-destructive',
}

import { BookmarkCheck, Gamepad2, ShieldX, ShoppingBag } from 'lucide-react'
import { IGames } from './game.interface'

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
  PROGRESS = 'PROGRESS',
  RATING = 'RATING',
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
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
  createdAt: string
  updatedAt?: string | null
}

export interface IGameStatusMost {
  game: IGames
  status: number
}

export interface IGameStatusCount {
  played: number
  playing: number
  wantPlay: number
  abandoned: number
  favorites: number
  ratings: number
}

export const StatusProgressLabel: Record<GameStatusProgress, string> = {
  [GameStatusProgress.TO_PLAY]: 'Wished',
  [GameStatusProgress.PLAYING]: 'Playing',
  [GameStatusProgress.COMPLETED]: 'Completed',
  [GameStatusProgress.ABANDONED]: 'Abandoned',
}

export const StatusProgressIcon: Record<GameStatusProgress, React.ElementType> =
  {
    [GameStatusProgress.TO_PLAY]: ShoppingBag,
    [GameStatusProgress.PLAYING]: Gamepad2,
    [GameStatusProgress.COMPLETED]: BookmarkCheck,
    [GameStatusProgress.ABANDONED]: ShieldX,
  }

import { IGames } from './game.interface'
import { IResponse } from './response.interface'
import { IUser } from './user.interface'

export const PATH_MAP = {
  '/people': {
    path: '/people',
    placeholder: 'Search people...',
  },
  '/games': {
    path: '/games',
    placeholder: 'Search games...',
  },
}

export interface ISearch {
  games: IResponse<IGames[]>
  users: IResponse<IUser[]>
}

export interface ISearchQuery {
  path?: string
  param?: string
  debounceMs?: number
}

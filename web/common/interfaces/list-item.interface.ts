import { IGames } from './game.interface'

export interface IListItem {
  id: string
  listId: string
  gameId: string
  position: number
  addedAt: string
  game: IGames
}

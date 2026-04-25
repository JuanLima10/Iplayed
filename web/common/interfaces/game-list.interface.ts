import { IListItem } from './list-item.interface'
import { IUser } from './user.interface'

export interface IGameList {
  id: string
  userId: string
  name: string
  createdAt: string
  user: IUser
  items: IListItem[]
  updatedAt: string | null
}

import { IGameList } from '../interfaces/game-list.interface'

export function findItem(slug: string, list_id: string, lists?: IGameList[]) {
  return lists
    ?.find(({ id }) => id === list_id)
    ?.items.find((item) => item.game.slug === slug)?.id
}

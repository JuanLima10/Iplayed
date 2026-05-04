import { IGameList } from '../interfaces/game-list.interface'

export function initialList(slug: string, lists?: IGameList[]) {
  return (
    lists
      ?.filter(({ items }) => items.some((item) => item.game.slug === slug))
      .map(({ id }) => id) ?? []
  )
}

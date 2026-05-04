import { IGames } from '../interfaces/game.interface'

export function groupGameType(collections: IGames[]) {
  return collections.reduce<Record<string, IGames[]>>((acc, item) => {
    const key = item.gameType

    if (!key) return acc

    if (!acc[key]) {
      acc[key] = []
    }

    acc[key].push(item)
    return acc
  }, {})
}

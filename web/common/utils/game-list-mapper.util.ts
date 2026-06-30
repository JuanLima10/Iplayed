import { ListGameItem } from '@/src/components/shared/read-game'
import { IGames } from '../interfaces/game.interface'

export function mapGameList(
  data: {
    game?: IGames
    rating?: number | null
    progress?: number | null
  }[]
): ListGameItem[] {
  return data
    .map(({ game, rating, progress }) => {
      if (!game) return null

      const { igdbId, slug, title, coverUrl } = game
      if (!igdbId || !slug || !title || !coverUrl) return null

      return {
        igdbId,
        slug,
        title,
        coverUrl,
        rating: rating ?? undefined,
        progress: progress ?? undefined,
      }
    })
    .filter(Boolean) as ListGameItem[]
}

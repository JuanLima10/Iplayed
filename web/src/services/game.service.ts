import { IGameStatus as Status } from '@/common/interfaces/game-status.interface'
import {
  IGame as Game,
  IGames as Games,
} from '@/common/interfaces/game.interface'
import { IResponse as Response } from '@/common/interfaces/response.interface'
import { http } from '@/common/lib/http.lib'
import { GameQuery } from '@/common/schemas/game.schema'
import { pickRandom } from '@/common/utils/random-pick.util'
import { randomSlug } from '@/common/utils/slug-random.util'
import { unstable_cache } from 'next/cache'

class GameService {
  async get(params?: GameQuery): Promise<Response<Games[]>> {
    return http<Response<Games[]>>('/game', { params })
  }

  async random(): Promise<Game> {
    return http<Game>('/game/random')
  }

  async getBanner(userId: string) {
    const best = await http<Response<Status[]>>(`/game-status/${userId}`, {
      params: { isBest: true },
      next: { revalidate: 3600 },
    })
    const slug = randomSlug(best.data)

    if (slug) {
      const game = await http<Game>(`/game/${slug}`, {
        next: { revalidate: 3600 },
      })
      return pickRandom(game.artworks && game.screenshots)
    }
    const game = await http<Game>('/game/random', {
      next: { revalidate: 3600 },
    })
    return pickRandom(game.artworks && game.screenshots)
  }

  async banner(userId: string) {
    return unstable_cache(() => this.getBanner(userId), ['banner', userId], {
      revalidate: 3600,
    })()
  }

  async getById(id: number): Promise<Games> {
    return http<Games>(`/game/igdb/${id}`)
  }

  async getBySlug(slug: string): Promise<Game> {
    return http<Game>(`/game/${slug}`)
  }
}

export const game_api = new GameService()

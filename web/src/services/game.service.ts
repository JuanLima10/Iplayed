import {
  IGame as Game,
  IGames as Games,
} from '@/common/interfaces/game.interface'
import { IResponse as Response } from '@/common/interfaces/response.interface'
import { http } from '@/common/lib/http.lib'
import { GameQuery } from '@/common/schemas/game.schema'

class GameService {
  async get(params?: GameQuery): Promise<Response<Games[]>> {
    return http<Response<Games[]>>('/game', { params })
  }

  async random(): Promise<Game> {
    return http<Game>('/game/random')
  }

  async getById(id: number): Promise<Games> {
    return http<Games>(`/game/igdb/${id}`)
  }

  async getBySlug(slug: string): Promise<Game> {
    return http<Game>(`/game/${slug}`)
  }
}

export const game_api = new GameService()

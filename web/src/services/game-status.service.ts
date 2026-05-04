import {
  IGameStatusRating as Ratings,
  IGameStatus as Status,
  IGameStatusCount as StatusCount,
  IGameStatusMost as StatusMost,
} from '@/common/interfaces/game-status.interface'
import { IResponse as Response } from '@/common/interfaces/response.interface'
import api from '@/common/lib/api.lib'
import { http } from '@/common/lib/http.lib'
import { GameStatusQuery as Params } from '@/common/schemas/game-status.schema'

class GameStatusService {
  async getByUser(
    userId: string,
    params?: Params
  ): Promise<Response<Status[]>> {
    return http<Response<Status[]>>(`/game-status/${userId}`, { params })
  }

  async most(params?: Params): Promise<StatusMost[]> {
    return http<StatusMost[]>('/game-status/most', { params })
  }

  async count(param: string): Promise<StatusCount> {
    return http<StatusCount>(`/game-status/count/${param}`)
  }

  async rating(slug: string): Promise<Ratings> {
    return http<Ratings>(`/game-status/rating/${slug}`)
  }

  async delete(slug: string): Promise<void> {
    await api.delete(`/game-status/${slug}`)
  }
}

export const status_api = new GameStatusService()

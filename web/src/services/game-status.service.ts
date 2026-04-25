import {
  IGameStatus as Status,
  IGameStatusCount as StatusCount,
  IGameStatusMost as StatusMost,
} from '@/common/interfaces/game-status.interface'
import { IResponse as Response } from '@/common/interfaces/response.interface'
import api from '@/common/lib/api.lib'
import { http } from '@/common/lib/http.lib'
import {
  GameStatusCreate as StatusCreate,
  GameStatusQuery as StatusQuery,
  GameStatusUpdate as StatusUpdate,
} from '@/common/schemas/game-status.schema'

class GameStatusService {
  async getByUser(
    userId: string,
    params?: StatusQuery
  ): Promise<Response<Status[]>> {
    return http<Response<Status[]>>(`/game-status/${userId}`, { params })
  }

  async most(params?: StatusQuery): Promise<StatusMost[]> {
    return http<StatusMost[]>('/game-status/most', { params })
  }

  async count(param: string): Promise<Response<StatusCount>> {
    return http<Response<StatusCount>>(`/game-status/count/${param}`)
  }

  async upsert(body: StatusCreate): Promise<Status> {
    const { data } = await api.post<Status>('/game-status', body)
    return data
  }

  async patch(slug: string, body: StatusUpdate): Promise<Status> {
    const { data } = await api.patch<Status>(`/game-status/${slug}`, body)
    return data
  }

  async delete(slug: string): Promise<void> {
    await api.delete(`/game-status/${slug}`)
  }
}

export const status_api = new GameStatusService()

import { IGameList as List } from '@/common/interfaces/game-list.interface'
import { IResponse as Response } from '@/common/interfaces/response.interface'
import api from '@/common/lib/api.lib'
import { http } from '@/common/lib/http.lib'
import {
  GameListCreate as ListCreate,
  GameListUpdate as ListUpdate,
  GameListQuery as Params,
} from '@/common/schemas/game-list.schema'

class GameListService {
  async get(params?: Params): Promise<Response<List[]>> {
    return http<Response<List[]>>('/game-list', { params })
  }

  async getById(id: string, params?: Params): Promise<Response<List>> {
    return http<Response<List>>(`/game-list/${id}`, { params })
  }

  async getByUser(userId: string, params?: Params): Promise<Response<List[]>> {
    return http<Response<List[]>>(`/game-list/user/${userId}`, {
      params,
    })
  }

  async post(body: ListCreate): Promise<List> {
    const { data } = await api.post<List>('/game-list', body)
    return data
  }

  async patch(id: string, body: ListUpdate): Promise<List> {
    const { data } = await api.patch<List>(`/game-list/${id}`, body)
    return data
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/game-list/${id}`)
  }
}

export const list_api = new GameListService()

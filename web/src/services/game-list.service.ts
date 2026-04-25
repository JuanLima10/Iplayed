import { IGameList as GameList } from '@/common/interfaces/game-list.interface'
import { IResponse as Response } from '@/common/interfaces/response.interface'
import api from '@/common/lib/api.lib'
import { http } from '@/common/lib/http.lib'
import {
  GameListCreate,
  GameListQuery,
  GameListUpdate,
} from '@/common/schemas/game-list.schema'

class GameListService {
  async get(params?: GameListQuery): Promise<Response<GameList[]>> {
    return http<Response<GameList[]>>('/game-list', { params })
  }

  async getById(
    id: string,
    params?: Record<string, any>
  ): Promise<Response<GameList>> {
    return http<Response<GameList>>(`/game-list/${id}`, { params })
  }

  async getByUserId(
    userId: string,
    params?: GameListQuery
  ): Promise<Response<GameList[]>> {
    return http<Response<GameList[]>>(`/game-list/user/${userId}`, {
      params,
    })
  }

  async post(body: GameListCreate): Promise<GameList> {
    const { data } = await api.post<GameList>('/game-list', body)
    return data
  }

  async patch(id: string, body: GameListUpdate): Promise<GameList> {
    const { data } = await api.patch<GameList>(`/game-list/${id}`, body)
    return data
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/game-list/${id}`)
  }
}

export const list_api = new GameListService()

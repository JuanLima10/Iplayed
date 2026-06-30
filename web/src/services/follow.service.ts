import { IResponse as Response } from '@/common/interfaces/response.interface'
import { IUser as Follow } from '@/common/interfaces/user.interface'
import api from '@/common/lib/api.lib'
import { http } from '@/common/lib/http.lib'
import { FollowQuery as Params } from '@/common/schemas/follow.schema'

class FollowService {
  async followers(
    userId: string,
    params?: Params
  ): Promise<Response<Follow[]>> {
    return http<Response<Follow[]>>(`/follow/followers/${userId}`, { params })
  }

  async following(
    userId: string,
    params?: Params
  ): Promise<Response<Follow[]>> {
    return http<Response<Follow[]>>(`/follow/following/${userId}`, { params })
  }

  async follow(userId: string) {
    return api.post(`/follow/${userId}`)
  }

  async unfollow(userId: string): Promise<void> {
    await api.delete(`/follow/${userId}`)
  }
}

export const follow_api = new FollowService()

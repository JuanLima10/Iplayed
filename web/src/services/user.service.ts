import { IResponse as Response } from '@/common/interfaces/response.interface'
import { IUser as User } from '@/common/interfaces/user.interface'
import api from '@/common/lib/api.lib'
import { http } from '@/common/lib/http.lib'
import { UserQuery, UserUpdate } from '@/common/schemas/user.schema'

class UserService {
  async get(params?: UserQuery): Promise<Response<User[]>> {
    return http<Response<User[]>>('/user', { params })
  }

  async getMe(): Promise<User | null> {
    return http<User>('/user/me', { auth: true })
  }

  async getById(id: string): Promise<User> {
    return http<User>(`/user/${id}`)
  }

  async patch(body: UserUpdate): Promise<User> {
    const { data } = await api.patch<User>('/user', body)
    return data
  }

  async delete(): Promise<void> {
    return await api.delete('/user')
  }
}

export const user_api = new UserService()

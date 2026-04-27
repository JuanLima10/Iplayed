import { ISearch } from '@/common/interfaces/search.interface'
import api from '@/common/lib/api.lib'

class SearchService {
  async search(search: string): Promise<ISearch> {
    const [gameRes, userRes] = await Promise.allSettled([
      api.get(`/game`, { params: { search, limit: 4 } }),
      api.get(`/user`, { params: { search, limit: 4 } }),
    ])

    return {
      games: gameRes.status === 'fulfilled' ? (gameRes.value?.data ?? []) : [],
      users: userRes.status === 'fulfilled' ? (userRes.value?.data ?? []) : [],
    }
  }
}

export const search_api = new SearchService()

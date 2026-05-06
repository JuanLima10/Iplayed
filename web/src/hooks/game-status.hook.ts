import {
  IGameStatusCount as StatusCount,
  IGameStatusRating as StatusRating,
} from '@/common/interfaces/game-status.interface'
import { api } from '@/common/lib/api.lib'
import { useQuery } from '@tanstack/react-query'

export function useCountStatus(param: string) {
  const { data, ...query } = useQuery({
    queryKey: ['status-count', param],
    queryFn: async () => {
      return await api<StatusCount>(`/game-status/count/${param}`)
    },
    placeholderData: (prev) => prev,
  })

  return { ...query, count: data }
}

export function useRatingStatus(slug: string) {
  const { data, ...query } = useQuery({
    queryKey: ['status-rating', slug],
    queryFn: async () => {
      return await api<StatusRating>(`/game-status/rating/${slug}`)
    },
    placeholderData: (prev) => prev,
  })

  return { ...query, rating: data }
}

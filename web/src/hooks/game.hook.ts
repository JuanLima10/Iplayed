import { IGame as Game } from '@/common/interfaces/game.interface'
import { IResponse as Response } from '@/common/interfaces/response.interface'
import api from '@/common/lib/api.lib'
import { GameQuery as Params } from '@/common/schemas/game.schema'
import { useQuery } from '@tanstack/react-query'

export function useGetGame(params?: Params) {
  const { data, ...query } = useQuery({
    queryKey: ['games', params],
    queryFn: async () => {
      const { data } = await api.get<Response<Game[]>>(`/game`, { params })
      return data
    },
    placeholderData: (prev) => prev,
  })

  const games = data?.data
  const paginate = data?.paginate

  return { ...query, games, paginate }
}

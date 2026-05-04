import { IListItem as Item } from '@/common/interfaces/list-item.interface'
import { IResponse as Response } from '@/common/interfaces/response.interface'
import { api_auth } from '@/common/lib/api.lib'
import { ListItemCreate } from '@/common/schemas/list-item.schema'
import { querySuccess } from '@/common/utils/success-query.util'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const queryKey = [['list-item'], ['game-list']]

export function useUpsertListItem() {
  const queryClient = useQueryClient()

  const { mutateAsync: upsert, isPending } = useMutation({
    mutationFn: async (body: ListItemCreate & { list_id: string }) => {
      const { list_id, ...dto } = body

      return await api_auth<Response<Item>>(`/list-item/${list_id}`, {
        method: 'POST',
        body: JSON.stringify(dto),
      })
    },
    onSuccess: () => querySuccess(queryClient, queryKey),
  })

  return { upsert, isPending }
}

export function useRemoveListItem() {
  const queryClient = useQueryClient()

  const { mutateAsync: remove, isPending } = useMutation({
    mutationFn: async (body: { list_id: string; item_id?: string }) => {
      const { list_id, item_id } = body
      if (item_id) {
        return await api_auth<Response<Item>>(
          `/list-item/${list_id}/item/${item_id}`,
          { method: 'DELETE' }
        )
      }
    },
    onSuccess: () => querySuccess(queryClient, queryKey),
  })

  return { remove, isPending }
}

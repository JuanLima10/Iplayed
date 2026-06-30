import { IResponse as Response } from '@/common/interfaces/response.interface'
import { IUser as User } from '@/common/interfaces/user.interface'
import { api_auth } from '@/common/lib/api.lib'
import { toastError } from '@/common/lib/toast-error.lib'
import { UserUpdate } from '@/common/schemas/user.schema'
import { querySuccess } from '@/common/utils/success-query.util'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const queryKey = [['user']]

  const { mutateAsync: update, isPending } = useMutation({
    mutationFn: async (body: UserUpdate) => {
      return await api_auth<Response<User>>(`/user`, {
        method: 'PATCH',
        body: JSON.stringify(body),
      })
    },
    onSuccess: () => querySuccess(queryClient, queryKey),
    onError: toastError,
  })

  return { update, isPending }
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  const queryKey = [['user']]

  const { mutateAsync: remove, isPending } = useMutation({
    mutationFn: async () => {
      return await api_auth<Response<User>>(`/user`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => querySuccess(queryClient, queryKey),
    onError: toastError,
  })

  return { remove, isPending }
}

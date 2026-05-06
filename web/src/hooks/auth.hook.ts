import { api } from '@/common/lib/api.lib'
import { toastError } from '@/common/lib/toast-error.lib'
import { AuthCreate, AuthLogin } from '@/common/schemas/auth.schema'
import { saveSession } from '@/common/utils/session-save.util'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export function useLoginAuth() {
  const { push } = useRouter()

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: async (body: AuthLogin) => {
      return await api<{ token: string }>(`/auth/sign-in`, {
        method: 'POST',
        body: JSON.stringify(body),
      })
    },
    onSuccess: ({ token }) => saveSession(token, push),
    onError: toastError,
  })

  return { login, isPending }
}

export function useCreateAuth() {
  const { push } = useRouter()

  const { mutateAsync: create, isPending } = useMutation({
    mutationFn: async (body: AuthCreate) => {
      return await api<{ token: string }>(`/auth/sign-up`, {
        method: 'POST',
        body: JSON.stringify(body),
      })
    },
    onSuccess: ({ token }) => saveSession(token, push),
    onError: toastError,
  })

  return { create, isPending }
}

export function useLogout() {
  const { refresh } = useRouter()

  const { mutateAsync: logout, isPending } = useMutation({
    mutationFn: async () => Cookies.remove('iplayed_session'),
    onSuccess: () => refresh(),
  })

  return { logout, isPending }
}

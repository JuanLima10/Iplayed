import { QueryClient, QueryKey } from '@tanstack/react-query'

export function querySuccess(
  queryClient: QueryClient,
  queryKey: readonly QueryKey[]
) {
  if (!queryKey.length) return

  const [invalidateKey, ...refetchKeys] = queryKey

  queryClient.invalidateQueries({ queryKey: invalidateKey })

  refetchKeys.forEach((key) => {
    queryClient.refetchQueries({ queryKey: key })
  })
}

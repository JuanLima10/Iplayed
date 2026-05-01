import { InfiniteData } from '@tanstack/react-query'

export function getNextData<T>(data?: InfiniteData<{ data: T[] }>): T[] {
  if (!data) return []
  return data.pages.flatMap((page) => page.data)
}

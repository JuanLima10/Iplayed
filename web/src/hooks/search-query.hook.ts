import { ISearchQuery } from '@/common/interfaces/search.interface'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export function useSearchQuery(query: ISearchQuery = {}) {
  const { path = '', param = 'search', debounceMs = 400 } = query

  const router = useRouter()
  const searchParams = useSearchParams()

  const initialValue = searchParams.get(param) ?? ''
  const [value, setValue] = useState(initialValue)

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!isFirstRender.current) {
      setValue(initialValue)
    }
  }, [initialValue])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (!value) return

    const timeout = setTimeout(() => {
      const params = new URLSearchParams()
      params.set(param, value)

      router.replace(`${path}?${params.toString()}`, {
        scroll: false,
      })
    }, debounceMs)

    return () => clearTimeout(timeout)
  }, [value, path, param, debounceMs, router])

  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
  }
}

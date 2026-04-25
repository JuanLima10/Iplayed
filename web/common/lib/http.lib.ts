import { cookies } from 'next/headers'

type HttpOptions = RequestInit & {
  auth?: boolean
  params?: Record<string, string | number | boolean | undefined>
}

export async function http<T>(
  url: string,
  { auth = false, params, headers, ...options }: HttpOptions = {}
): Promise<T> {
  const query = params
    ? '?' +
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${k}=${encodeURIComponent(v!)}`)
        .join('&')
    : ''

  let token: string | undefined
  if (auth) {
    const cookie = cookies()
    token = (await cookie).get('iplayed_session')?.value
    if (!token) return null as T
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}${query}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  })

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw error ?? new Error(res.statusText)
  }

  return res.json()
}

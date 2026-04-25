import { cookies } from 'next/headers'
import { ProblemDetails } from '../interfaces/problem-details.interface'
import { ProblemError } from './error.lib'

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
    const cookieStore = await cookies()
    token = cookieStore.get('iplayed_session')?.value

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

  if (res.status === 401) {
    return null as T
  }

  if (!res.ok) {
    const problem: ProblemDetails | null = await res.json().catch(() => null)

    if (problem?.status) {
      throw new ProblemError(problem)
    }

    throw new Error(res.statusText)
  }

  return res.json()
}

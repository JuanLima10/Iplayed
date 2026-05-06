import { ProblemDetails } from '../interfaces/problem-details.interface'
import { ProblemError } from './error.lib'

type ApiOptions = RequestInit & {
  auth?: boolean
  params?: Record<string, string | number | boolean | undefined>
}

type ApiResponse<T> = {
  data: T
}

function buildQuery(params?: ApiOptions['params']) {
  return params
    ? '?' +
        Object.entries(params)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
          .join('&')
    : ''
}

async function parseBody<T>(res: Response): Promise<T> {
  const text = await res.text()
  return text ? (JSON.parse(text) as T) : (null as T)
}

async function request<T>(
  url: string,
  { auth = false, params, headers, ...options }: ApiOptions = {}
): Promise<T> {
  const query = buildQuery(params)

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}${query}`, {
    ...options,
    credentials: auth ? 'include' : options.credentials,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })

  if (!res.ok) {
    const problem = await parseBody<ProblemDetails | null>(res).catch(
      () => null
    )

    if (problem?.status) {
      throw new ProblemError(problem)
    }

    throw new Error(res.statusText)
  }

  return parseBody<T>(res)
}

export function api<T>(url: string, options?: ApiOptions) {
  return request<T>(url, options)
}

export function api_auth<T>(url: string, options?: ApiOptions) {
  return request<T>(url, { ...options, auth: true })
}

async function requestResponse<T>(
  url: string,
  options?: ApiOptions
): Promise<ApiResponse<T>> {
  return { data: await request<T>(url, options) }
}

const apiClient = {
  get: <T = any>(url: string, options?: ApiOptions) =>
    requestResponse<T>(url, options),
  post: <T = any>(url: string, body?: unknown, options?: ApiOptions) =>
    requestResponse<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),
  patch: <T = any>(url: string, body?: unknown, options?: ApiOptions) =>
    requestResponse<T>(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  delete: <T = any>(url: string, options?: ApiOptions) =>
    requestResponse<T>(url, { ...options, method: 'DELETE' }),
}

export default apiClient

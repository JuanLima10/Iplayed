import { z } from 'zod'

export function parseSearchParams<T>(
  schema: z.ZodSchema<T>,
  searchParams?: Record<string, string | string[] | undefined>
): T {
  const normalized: Record<string, unknown> = {}

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (Array.isArray(value)) {
        normalized[key] = value[0]
      } else {
        normalized[key] = value
      }
    }
  }

  const parsed = schema.safeParse(normalized)

  if (!parsed.success) {
    return {} as T
  }

  return parsed.data
}

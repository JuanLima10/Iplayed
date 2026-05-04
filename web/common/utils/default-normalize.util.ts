export type NormalizedDefaults<T> = {
  [K in keyof T]?: Exclude<T[K], null>
}

export function normalizeDefaults<T extends Record<string, any>>(
  obj?: T | null
): NormalizedDefaults<T> | undefined {
  if (!obj) return undefined

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === null ? undefined : value,
    ])
  ) as NormalizedDefaults<T>
}

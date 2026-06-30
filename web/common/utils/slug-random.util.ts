export function randomSlug(
  data: {
    status: string
    game?: {
      slug: string
    }
  }[],
  options?: {
    status?: string | string[]
  }
): string | undefined {
  if (!data?.length) return undefined

  let filtered = data

  if (options?.status) {
    const statuses = Array.isArray(options.status)
      ? options.status
      : [options.status]

    filtered = data.filter((item) => statuses.includes(item.status))
  }

  const valid = filtered.filter((item) => item.game?.slug)

  if (!valid.length) return undefined

  const randomIndex = Math.floor(Math.random() * valid.length)
  return valid[randomIndex].game!.slug
}

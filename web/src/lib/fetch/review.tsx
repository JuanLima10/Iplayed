export const getMostReviewed = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/most-reviewed`, {
    cache: "no-cache",
  }).then(res => res.json())
}

export const getRecentReviews = async (offset: number, limit: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/game/reviews?offset=${offset}&limit=${limit}`, {
    cache: "no-cache",
  }
  ).then(res => res.json())
}

export const getGameReviews = async (slug: string, offset: number, limit: number) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/reviews/${slug}?offset=${offset}&limit=${limit}`)
    .then(res => res.json())
}
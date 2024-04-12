export const getGameRating = async (slug: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/ratings/${slug}`)
    .then(res => res.json())
}
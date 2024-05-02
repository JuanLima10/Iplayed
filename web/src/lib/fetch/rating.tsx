import { token } from "../igdb"

export const getGameRating = async (slug: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/ratings/${slug}`)
    .then(res => res.json())
}

export const getUserRatings = async (userId: string, offset: number, limit: number) => {
  const { access_token } = await token()
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/ratings/${userId}?offset=${offset}&limit=${limit}&token=${access_token}`
  ).then(res => res.json())
}

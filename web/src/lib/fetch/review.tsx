import { token } from "../igdb"

export const getMostReviewed = async () => {
  const { access_token } = await token()
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/most-reviewed?token=${access_token}`, {
    cache: "no-cache",
  }).then(res => res.json())
}

export const getRecentReviews = async (offset: number, limit: number) => {
  const { access_token } = await token()
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/game/reviews?offset=${offset}&limit=${limit}&token=${access_token}`, {
    cache: "no-cache",
  }
  ).then(res => res.json())
}

export const getUserReviews = async (userId: string, offset: number, limit: number) => {
  const { access_token } = await token()
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/reviews/${userId}?offset=${offset}&limit=${limit}&token=${access_token}`)
    .then(res => res.json())
}


export const getGameReviews = async (slug: string, offset: number, limit: number) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/reviews/${slug}?offset=${offset}&limit=${limit}`)
    .then(res => res.json())
}
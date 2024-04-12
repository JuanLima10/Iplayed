import { headers } from '../headers'

export const getGameInfo = async (slug: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/info/${slug}`)
    .then(res => res.json())
}

export const getGameUser = async (slug: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/user/${slug}`, {
    headers,
  }).then(res => res.json())
}

export const postGame = async (slug: string, data: any) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/${slug}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  }).then(res => res.json())
}
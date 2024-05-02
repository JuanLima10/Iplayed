import { headers } from '../headers'
import { token } from '../igdb'

export const getUserLikeWish = async (option: string, userId: string, offset: number | 0, limit: number | 6) => {
  const { access_token } = await token()
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${option}/${userId}?offset=${offset}&limit=${limit}&token=${access_token}`
  ).then(res => res.json()).catch(err => console.error(err))
}

export const postLikeWish = async (option: string, slug: string, data: any) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/${option}/${slug}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
}

export const deleteLikeWish = async (option: string, slug: string) => {
  const { id } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${option}/${slug}`, {
    headers
  }).then(res => res.json())
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/${option}/${id}`, {
    method: 'DELETE',
    headers,
  })
}
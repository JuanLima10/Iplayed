import { headers } from '../headers'

export const getUserLikeWish = async (option: string, userId: string, offset: number, limit: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${option}/${userId}?offset=${offset}&limit=${limit}`
    ).then(res => res.json())
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
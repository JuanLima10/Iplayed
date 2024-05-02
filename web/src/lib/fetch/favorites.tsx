import { headers } from '../headers'
import { token } from '../igdb'

export const getUserFavorites = async (userId: string) => {
  const { access_token } = await token()
  const favs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/fav/${userId}?token=${access_token}`)
  if (favs.status === 200) {
    return favs.json()
  }
  return null
}

export const postFavorites = async (slug: FormDataEntryValue, data: { slug: FormDataEntryValue | null, id: string }) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/fav/${slug}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  })
}

export const deleteFavorites = async (slug: string) => {
  const { id } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fav/${slug}`, {
    headers: headers,
  }).then(res => res.json())
  if (id) {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/fav/${id}`, {
      method: 'DELETE',
      headers: headers,
    }).then(res => res.json())
  }
  return
}
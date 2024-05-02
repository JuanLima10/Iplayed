import { token } from '../igdb'

export const getUserGames = async (type: string, param: string, offset: number | 0, limit: number | 6) => {
  const { access_token } = await token()
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${type}/${param}?offset=${offset}&limit=${limit}&token=${access_token}`
  ).then(res => res.json()).catch(err => console.error(err))
  return data.data
}

export const getGamesReviews = async (option: 'user' | 'game', type: string, param: string, offset: number | 0, limit: number | 6) => {
  const { access_token } = await token()
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${option}/${type}${param}?offset=${offset}&limit=${limit}&token=${access_token}`
  ).then(res => res.json()).catch(err => console.error(err))
  return data.data
}
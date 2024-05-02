import { UserProps } from '@/Types/User'
import { headers } from '../headers'
import { token } from '../igdb'

export const getUserById = async (param: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${param}`, {
    cache: 'no-cache',
  }).then(res => res.json())
}

export const getUserProfile = async (param: string) => {
  const { access_token } = await token()
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile/${param}?token=${access_token}`)
    .then(res => res.json())
}

export const getUserInfos = async (param: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/info/${param}`)
    .then(res => res.json())
}

export const getUserBanner = async (param: string) => {
  const { access_token } = await token()
  const banner = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/banner/${param}?token=${access_token}`)
  if (banner.status === 200) {
    return banner.json()
  }
  return null
}

export const getUserReviews = async (param: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/${param}`)
    .then(res => res.json())
}

export const searchUser = async (search: string) => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    cache: 'no-cache',
  }).then(res => res.json())

  return result.filter((user: UserProps) =>
    user.login?.toLowerCase().includes(String(search)) ||
    user.name?.toLowerCase().includes(String(search))
  )
}

export const putUser = async (id: string, data: any) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  }).then(res => res.json())
}
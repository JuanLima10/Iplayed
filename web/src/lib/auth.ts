import decode from 'jwt-decode'
import { cookies } from 'next/headers'

import { UserProps } from '@/Types/User'

export function getUser(): UserProps {
  const token = cookies().get('iplayed_session')?.value
  const user: UserProps | any = token && decode(token)
  return user
}

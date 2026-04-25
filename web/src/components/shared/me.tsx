import { user_api } from '@/src/services/user.service'
import Image from 'next/image'
import { SignIn } from './sign-in'

export async function Me() {
  const me = await user_api.getMe()
  if (!me) return <SignIn />

  return (
    <Image
      className="w- rounded-full border"
      src={me?.avatarUrl}
      alt={me?.username}
      width={44}
      height={44}
      suppressHydrationWarning
    />
  )
}

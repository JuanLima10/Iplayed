import { user_api } from '@/src/services/user.service'
import { CircleUser } from 'lucide-react'
import { AuthRedirect } from './auth-redirect'
import { ProfileDropdown } from './profile-dropdown'

export async function Me() {
  const me = await user_api.getMe()
  if (!me)
    return (
      <AuthRedirect variant="tertiary">
        <CircleUser size={14} suppressHydrationWarning />
        <b>Sign in</b> <p className="hidden sm:block">on Iplayed</p>
      </AuthRedirect>
    )

  return <ProfileDropdown {...me} />
}

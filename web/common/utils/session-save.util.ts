import Cookies from 'js-cookie'
import { getSessionCookieOptions } from './session-cookie.util'

export function saveSession(token?: string, push?: (href: string) => void) {
  if (!token || !push) return

  const redirectTo = Cookies.get('redirect_to') ?? '/home'

  Cookies.set('iplayed_session', token, {
    ...getSessionCookieOptions(),
    expires: 30,
  })

  push(redirectTo)
}

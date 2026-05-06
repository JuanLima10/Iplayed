import Cookies from 'js-cookie'

export function saveSession(token?: string, push?: (href: string) => void) {
  if (!token || !push) return

  const redirectTo = Cookies.get('redirect_to') ?? '/home'

  Cookies.set('iplayed_session', token, {
    expires: 30,
    sameSite: 'strict',
  })

  push(redirectTo)
}

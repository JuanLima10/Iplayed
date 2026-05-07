type CookieOptions = {
  path: string
  sameSite: 'lax' | 'strict'
  secure: boolean
}

export function getSessionCookieOptions(): CookieOptions {
  return {
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  }
}

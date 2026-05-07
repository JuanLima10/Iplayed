type CookieOptions = {
  domain?: string
  path: string
  sameSite: 'lax' | 'strict'
  secure: boolean
}

function getCookieDomain() {
  const webUrl = process.env.NEXT_PUBLIC_WEB_URL

  if (!webUrl) return undefined

  const hostname = new URL(webUrl).hostname

  if (hostname === 'localhost' || /^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname)) {
    return undefined
  }

  const parts = hostname.split('.')

  if (parts.length <= 2) return hostname

  return `.${parts.slice(-2).join('.')}`
}

export function getSessionCookieOptions(): CookieOptions {
  const domain = getCookieDomain()

  return {
    ...(domain ? { domain } : {}),
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  }
}

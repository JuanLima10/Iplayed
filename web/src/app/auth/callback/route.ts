import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookieOptions } from '@/common/utils/session-cookie.util'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  const redirectValue = request.cookies.get('redirect_to')?.value
  const redirectTo =
    redirectValue && redirectValue !== '/auth' ? redirectValue : '/home'
  const response = NextResponse.redirect(new URL(redirectTo, request.url))

  response.cookies.set({
    name: 'iplayed_session',
    value: token,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    ...getSessionCookieOptions(),
  })

  return response
}

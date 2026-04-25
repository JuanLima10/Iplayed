import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  const redirectTo = request.cookies.get('redirect_to')?.value ?? '/home'
  const response = NextResponse.redirect(new URL(redirectTo, request.url))

  response.cookies.set({
    name: 'iplayed_session',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return response
}

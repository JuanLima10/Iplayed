import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  const redirectTo = request.cookies.get('redirect_to')?.value
  const redirectUrl = redirectTo ?? new URL('/', request.url)

  const cookieExpires = 60 * 60 * 24 * 7

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `iplayed_session=${token}; Path=/; maxAge=${cookieExpires};`,
    },
  })
}
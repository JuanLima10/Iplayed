'use client'

import Image from 'next/image'
import { Button } from '../ui/button'

function redirectAuth() {
  document.cookie = `redirect_to=${window.location.pathname}; Path=/;`
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/discord`
}

export function SignIn() {
  return (
    <Button variant="tertiary" onClick={redirectAuth}>
      <Image
        src="/icons/discord.png"
        alt="discord"
        width={20}
        height={14}
        suppressHydrationWarning
      />
      <b>Sign in</b> <p className="hidden sm:block">with discord</p>
    </Button>
  )
}

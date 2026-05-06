'use client'

import Image from 'next/image'
import { Button } from '../ui/button'

function redirectDiscord() {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/discord`
}

export function Discord() {
  return (
    <Button
      className="min-w-full"
      variant="tertiary"
      size="md"
      onClick={redirectDiscord}
    >
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

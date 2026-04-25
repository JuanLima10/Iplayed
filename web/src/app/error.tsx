'use client'

import { ProblemDetails } from '@/common/interfaces/problem-details.interface'
import Image from 'next/image'
import { useEffect } from 'react'

interface ErrorProps {
  error: Error & Partial<ProblemDetails>
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const is401 = error.status === 401

  useEffect(() => {
    if (!is401) {
      console.error(error)
    }
  }, [error, is401])

  if (is401) return null

  return (
    <div className="flex h-svh w-full flex-col items-center justify-center gap-4">
      <Image
        src="/logo.png"
        alt="IPlayed"
        width={150}
        height={36}
        priority
        suppressHydrationWarning
      />
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <p className="text-muted-foreground">Something went wrong.</p>
        <button onClick={reset} className="underline">
          Try again
        </button>
      </div>
    </div>
  )
}

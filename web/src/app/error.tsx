'use client'

import { UnauthenticatedError } from '@/common/lib/error.lib'
import { useEffect } from 'react'

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (error instanceof UnauthenticatedError) return
    console.error(error)
  }, [error])

  if (error instanceof UnauthenticatedError) return null

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <p className="text-muted-foreground">Something went wrong.</p>
      <button onClick={reset} className="underline">
        Try again
      </button>
    </div>
  )
}

// components/countdown.tsx
'use client'

import { useEffect, useState } from 'react'

function getTimeLeft(releaseDate: string) {
  const diff = new Date(releaseDate).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, min: 0 }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    min: Math.floor((diff / (1000 * 60)) % 60),
  }
}

export function Countdown({ releaseDate }: { releaseDate: string }) {
  const [time, setTime] = useState(getTimeLeft(releaseDate))

  useEffect(() => {
    const interval = setInterval(
      () => setTime(getTimeLeft(releaseDate)),
      1000 * 60
    )
    return () => clearInterval(interval)
  }, [releaseDate])

  return (
    <div className="flex items-start gap-2 text-foreground">
      {[
        { value: time.days, label: 'days' },
        { value: time.hours, label: 'hours' },
        { value: time.min, label: 'min' },
      ].map(({ value, label }, i) => (
        <div key={label} className="flex items-start gap-2">
          {i > 0 && <span className="text-2xl leading-none font-bold">:</span>}
          <div className="flex flex-col items-center">
            <span className="text-2xl leading-none font-bold">
              {String(value).padStart(2, '0')}
            </span>
            <span className="text-xs">{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

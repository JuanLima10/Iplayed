'use client'

import { Slider } from '@/src/components/ui/slider'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const MIN_YEAR = 1952
const MAX_YEAR = new Date().getFullYear()

export function ReleaseYear() {
  const { push } = useRouter()
  const searchParams = useSearchParams()

  const releasedAfterYear =
    searchParams.get('releasedAfter')?.slice(0, 4) ?? String(MIN_YEAR)

  const releasedBeforeYear =
    searchParams.get('releasedBefore')?.slice(0, 4) ?? String(MAX_YEAR)

  const yearRange = useMemo(
    () => [Number(releasedAfterYear), Number(releasedBeforeYear)],
    [releasedAfterYear, releasedBeforeYear]
  )

  const [tempRange, setTempRange] = useState(yearRange)

  useEffect(() => {
    setTempRange(yearRange)
  }, [yearRange])

  function updateParams(from: number, to: number) {
    const params = new URLSearchParams(searchParams.toString())

    params.set('releasedAfter', `${from}-01-01`)
    params.set('releasedBefore', `${to}-12-31`)
    params.delete('page')

    push(`?${params.toString()}`)
  }

  return (
    <div className="w-full space-y-3">
      <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        Release year
      </h3>

      <Slider
        min={MIN_YEAR}
        max={MAX_YEAR}
        step={1}
        value={tempRange}
        onValueChange={setTempRange}
        onValueCommit={([from, to]) => updateParams(from, to)}
      />

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{yearRange[0]}</span>
        <span>{yearRange[1]}</span>
      </div>
    </div>
  )
}

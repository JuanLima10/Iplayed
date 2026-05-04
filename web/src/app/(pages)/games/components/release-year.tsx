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

  const yearRange = useMemo<[number, number]>(
    () => [Number(releasedAfterYear), Number(releasedBeforeYear)],
    [releasedAfterYear, releasedBeforeYear]
  )

  const [tempRange, setTempRange] = useState<[number, number]>(yearRange)

  useEffect(() => {
    setTempRange(yearRange)
  }, [yearRange])

  function updateParams([from, to]: [number, number]) {
    const params = new URLSearchParams(searchParams.toString())

    params.set('releasedAfter', `${from}-01-01`)
    params.set('releasedBefore', `${to}-12-31`)
    params.delete('page')

    push(`?${params.toString()}`)
  }

  const onChage = (value?: number | [number, number] | undefined) => {
    if (Array.isArray(value)) {
      setTempRange([value[0], value[1]])
    }
  }

  const onValueCommit = (value?: number | [number, number] | undefined) => {
    if (Array.isArray(value)) {
      updateParams([value[0], value[1]])
    }
  }

  return (
    <div className="w-full space-y-3">
      <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        Release year
      </h3>

      <Slider
        value={tempRange}
        min={MIN_YEAR}
        max={MAX_YEAR}
        step={1}
        showValue={false}
        onChange={onChage}
        onValueCommit={onValueCommit}
      />

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{tempRange[0]}</span>
        <span>{tempRange[1]}</span>
      </div>
    </div>
  )
}

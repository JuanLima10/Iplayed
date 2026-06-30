'use client'

import { Button } from '@/src/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type OrderByOption<T extends string> = {
  label: string
  value: T
  defaultOrder?: 'asc' | 'desc'
}

type OrderByProps<T extends string> = {
  options: readonly OrderByOption<T>[]
  paramName?: string
  defaultValue: T
}

export function OrderBy<T extends string>({
  options,
  defaultValue,
  paramName = 'orderBy',
}: OrderByProps<T>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const current = (searchParams.get(paramName) as T | null) ?? defaultValue

  function onChange(option: OrderByOption<T>) {
    const params = new URLSearchParams(searchParams.toString())

    params.set(paramName, option.value)
    params.set('order', option.defaultOrder ?? 'desc')
    params.delete('page')

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        Order By
      </h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = current === opt.value

          return (
            <Button
              key={opt.value}
              size="sm"
              variant={active ? 'default' : 'outline'}
              onClick={() => onChange(opt)}
            >
              {opt.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import { Button } from '@/src/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export function Order() {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const order = (searchParams.get('order') as 'asc' | 'desc') ?? 'desc'

  function updateOrder(value: 'asc' | 'desc') {
    const params = new URLSearchParams(searchParams.toString())

    params.set('order', value)
    params.delete('page')

    push(`?${params.toString()}`)
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        Order
      </h3>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant={order === 'asc' ? 'ghost' : 'default'}
          onClick={() => updateOrder('desc')}
        >
          Desc
        </Button>

        <Button
          size="sm"
          variant={order === 'asc' ? 'default' : 'ghost'}
          onClick={() => updateOrder('asc')}
        >
          Asc
        </Button>
      </div>
    </div>
  )
}

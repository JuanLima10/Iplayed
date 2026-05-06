'use client'

import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts'
import { Skeleton } from './skeleton'

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null

  const { stars, value } = payload[0].payload

  return (
    <div className="z-50 inline-flex items-center gap-1.5 rounded-md border border-border bg-foreground px-3 py-1.5 text-xs text-background">
      {stars && `${stars} ⭐ • `} {value}
    </div>
  )
}

function ChartBar({
  ratings,
}: {
  ratings: { stars: number; value: number }[]
}) {
  return (
    <div className="h-24 w-full border-b">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={ratings} barCategoryGap={0} barGap={0}>
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="100%" stopColor="#3FFF8B" stopOpacity={1} />
            </linearGradient>

            <linearGradient id="greenActive" x1="0" y1="1" x2="0" y2="0">
              <stop offset="100%" stopColor="#3FFF8B80" />
            </linearGradient>
          </defs>

          <RechartsTooltip
            cursor={{ fill: 'transparent' }}
            content={<ChartTooltip />}
          />

          <Bar
            dataKey="value"
            fill="url(#greenGradient)"
            activeBar={{ fill: 'url(#greenActive)' }}
            radius={[2, 2, 0, 0]}
            isAnimationActive
            animationDuration={900}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function ChartBarSkeleton() {
  const bars = useMemo(
    () =>
      Array.from({ length: 9 }).map(() => Math.floor(Math.random() * 61 + 40)),
    []
  )

  return (
    <div className="flex h-24 w-full items-end gap-0.5 px-1">
      {bars.map((height, i) => (
        <Skeleton
          key={i}
          className="w-full rounded-t-sm rounded-b-none"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  )
}

export { ChartBar, ChartBarSkeleton, ChartTooltip }

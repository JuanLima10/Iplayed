'use client'

import { Slider as SliderPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/common/utils/cn.util'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col',
        className
      )}
      onValueChange={() => setActiveIndex((i) => i)}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full bg-muted data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute bg-primary select-none data-horizontal:h-full data-vertical:w-full"
        />
      </SliderPrimitive.Track>

      <TooltipProvider>
        {Array.from({ length: _values.length }, (_, index) => (
          <Tooltip key={index} open={activeIndex === index}>
            <TooltipTrigger asChild>
              <SliderPrimitive.Thumb
                data-slot="slider-thumb"
                className="relative block size-3 shrink-0 cursor-pointer rounded-full bg-primary ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
                onPointerDown={() => setActiveIndex(index)}
                onPointerUp={() => setActiveIndex(null)}
              />
            </TooltipTrigger>
            <TooltipContent>{_values[index]}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </SliderPrimitive.Root>
  )
}

export { Slider }

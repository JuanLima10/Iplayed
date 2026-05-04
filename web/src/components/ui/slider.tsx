'use client'

import { Slider as SliderPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/common/utils/cn.util'
import { Label } from './label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'

interface ISlider {
  value?: number | [number, number]
  onChange?: (value?: number | [number, number]) => void
  onValueCommit?: (value?: number | [number, number]) => void
  min?: number
  max?: number
  step?: number
  label?: string
  required?: boolean
  error?: string
  showValue?: boolean
  className?: string
}

export function Slider({
  value,
  onChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  label,
  required,
  error,
  showValue = true,
  className,
}: ISlider) {
  const values = Array.isArray(value) ? value : [value ?? min]
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const isRange = values.length > 1

  function handleValueChange(nextValues: number[]) {
    onChange?.(isRange ? [nextValues[0], nextValues[1]] : nextValues[0])
  }

  function handleValueCommit(nextValues: number[]) {
    onValueCommit?.(isRange ? [nextValues[0], nextValues[1]] : nextValues[0])
  }

  return (
    <div className="space-y-2.5">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <Label>
              {label}
              {required && <b className="text-destructive">*</b>}
            </Label>
          )}

          {showValue && (
            <span className="text-sm text-muted-foreground">
              {value ?? min}%
            </span>
          )}
        </div>
      )}

      <SliderPrimitive.Root
        value={values}
        min={min}
        max={max}
        step={step}
        aria-invalid={!!error}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        className={cn(
          'relative flex w-full touch-none items-center select-none',
          className
        )}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-muted">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>

        <TooltipProvider>
          {values.map((thumbValue, index) => (
            <Tooltip key={index} open={activeIndex === index}>
              <TooltipTrigger asChild>
                <SliderPrimitive.Thumb
                  className="relative block size-3 cursor-pointer rounded-full bg-primary ring-ring/50 transition-[color,box-shadow] hover:ring-3 focus-visible:ring-3 focus-visible:outline-none"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(null)}
                />
              </TooltipTrigger>
              <TooltipContent>{thumbValue}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </SliderPrimitive.Root>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

'use client'

import Star from '@/public/icons/star'
import { useState } from 'react'

interface StarsProps {
  value?: number
  onChange?: (value: number) => void
  disabled?: boolean
  size?: 'default' | 'sm'
}

function getStarFill(
  starIndex: number,
  value: number
): 'empty' | 'half' | 'full' {
  const starValue = starIndex + 1
  if (value >= starValue) return 'full'
  if (value >= starValue - 0.5) return 'half'
  return 'empty'
}

export function Stars(props: StarsProps) {
  const { value = 0, onChange, disabled = false, size } = props

  const [hovered, setHovered] = useState<number | null>(null)
  const displayed = hovered ?? value

  function handleMouseMove(e: React.MouseEvent, starIndex: number) {
    if (disabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const isHalf = x < rect.width / 2
    setHovered(isHalf ? starIndex + 0.5 : starIndex + 1)
  }

  function handleClick(e: React.MouseEvent, starIndex: number) {
    if (disabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const isHalf = x < rect.width / 2
    const newValue = isHalf ? starIndex + 0.5 : starIndex + 1
    onChange?.(newValue)
  }

  return (
    <div
      className="flex items-center gap-0.5"
      onMouseLeave={() => setHovered(null)}
      role="radiogroup"
      aria-label="Star rating"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={Math.round(value) === i + 1}
          aria-label={`${i + 0.5} or ${i + 1} stars`}
          disabled={disabled}
          className="cursor-pointer transition-transform duration-100 hover:scale-110 disabled:cursor-default disabled:hover:scale-100"
          onMouseMove={(e) => handleMouseMove(e, i)}
          onClick={(e) => handleClick(e, i)}
        >
          <Star fill={getStarFill(i, displayed)} size={size} />
        </button>
      ))}
    </div>
  )
}

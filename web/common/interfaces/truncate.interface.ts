import { ReactNode } from 'react'

export interface ITruncate {
  text: string
  maxLength: number
  ellipsis?: string
  trim?: boolean
  renderText?: (value: string) => ReactNode
  className?: string
  tooltipClassName?: string
  disabled?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}

export interface ITruncateOptions {
  maxLength: number
  ellipsis?: string
  trim?: boolean
}

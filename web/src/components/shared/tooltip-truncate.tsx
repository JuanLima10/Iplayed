'use client'

import { ITruncate } from '@/common/interfaces/truncate.interface'
import { cn } from '@/common/utils/cn.util'
import { truncate } from '@/common/utils/truncate.util'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

export function TooltipTruncate(props: ITruncate) {
  const { text, maxLength, ellipsis, trim } = props
  const { disabled = false, side = 'top', align = 'center' } = props

  const truncated = truncate(props.text, { maxLength, ellipsis, trim })
  const content = props.renderText ? props.renderText(truncated) : truncated

  if (disabled || truncated === text) {
    return <span className={props.className}>{content}</span>
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn(props.className)}>{content}</span>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={props.tooltipClassName}
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

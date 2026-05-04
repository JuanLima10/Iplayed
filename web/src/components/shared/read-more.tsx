'use client'

import { ITruncate } from '@/common/interfaces/truncate.interface'
import { cn } from '@/common/utils/cn.util'
import { truncate } from '@/common/utils/truncate.util'
import { useState } from 'react'
import { Button } from '../ui/button'

export function ReadMore(props: ITruncate) {
  const { text, renderText, className, disabled = false, ...truncates } = props

  const [expanded, setExpanded] = useState(false)

  if (!text) return null

  const truncated = truncate(text, { ...truncates })
  const isTruncated = !disabled && truncated !== text

  const displayText = expanded ? text : truncated
  const content = renderText ? renderText(displayText) : displayText

  return (
    <p
      className={cn(
        className,
        isTruncated && 'flex cursor-pointer flex-col items-start'
      )}
      onClick={() =>
        isTruncated || expanded ? setExpanded((prev) => !prev) : undefined
      }
    >
      {content}
      {isTruncated && (
        <Button
          className="px-0 text-secondary"
          variant="link"
          onClick={(e) => {
            e.stopPropagation()
            setExpanded((prev) => !prev)
          }}
        >
          {expanded ? 'Read less' : 'Read more...'}
        </Button>
      )}
    </p>
  )
}

import * as React from 'react'

import { cn } from '@/common/utils/cn.util'
import { Label } from './label'

function Textarea({
  className,
  required,
  label,
  error,
  ...props
}: React.ComponentProps<'textarea'> & { label?: string; error?: string }) {
  return (
    <div className="space-y-2.5">
      {label && (
        <Label>
          {label}
          {required && <b className="text-destructive">*</b>}
        </Label>
      )}
      <textarea
        data-slot="textarea"
        required={required}
        className={cn(
          'flex field-sizing-content h-42 max-h-full w-full resize-none overflow-y-auto rounded-lg border border-input bg-input p-3 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
          className
        )}
        {...props}
      />
      {error && (
        <span className="absolute text-xs text-destructive">{error}</span>
      )}
    </div>
  )
}

export { Textarea }

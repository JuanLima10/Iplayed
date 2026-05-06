import { cn } from '@/common/utils/cn.util'
import { Eye, EyeOff, LucideIcon } from 'lucide-react'
import * as React from 'react'
import { Label } from './label'

interface InputProps extends React.ComponentProps<'input'> {
  label?: string
  error?: string
  required?: boolean
  icon?: LucideIcon
}

function Input({
  className,
  icon: Icon,
  type,
  label,
  required,
  error,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const isPassword = type === 'password'
  const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="relative space-y-2.5">
      {label && (
        <Label>
          {label}
          {required && <b className="text-destructive">*</b>}
        </Label>
      )}
      <div
        className={cn(
          'flex h-9 w-full min-w-0 items-center gap-2 rounded-md border-2 border-input bg-input px-3 py-2 text-base text-muted-foreground shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive',
          className
        )}
      >
        {Icon && (
          <Icon
            className="text-muted-foreground"
            size={14}
            suppressHydrationWarning
          />
        )}
        <input
          type={resolvedType}
          data-slot="input"
          className="w-full outline-0"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="ml-auto shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
      {error && (
        <span className="absolute -bottom-5 text-xs text-destructive">
          {error}
        </span>
      )}
    </div>
  )
}

export { Input }

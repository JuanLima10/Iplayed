'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '@/src/components/ui/button'
import { Calendar } from '@/src/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover'
import { useState } from 'react'
import { Label } from './label'

interface IDatePicker {
  value?: string
  onChange?: (value?: string) => void
  label?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  error?: string
}

export function DatePicker({
  value,
  onChange,
  label,
  required,
  disabled,
  placeholder = 'Pick a date',
  error,
}: IDatePicker) {
  const [open, setOpen] = useState(false)
  const date = value ? new Date(value) : undefined

  function handleSelect(day?: Date) {
    onChange?.(day ? day.toISOString() : undefined)
    setOpen(false)
  }

  return (
    <div className="space-y-2.5">
      {label && (
        <Label>
          {label}
          {required && <b className="text-destructive">*</b>}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className="w-full justify-start border border-input bg-input text-left font-normal data-[empty=true]:text-muted-foreground"
            variant="ghost"
            disabled={disabled}
            aria-invalid={!!error}
            data-empty={!date}
            onClick={() => setOpen(true)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            onSelect={handleSelect}
            disabled={(day) => day > new Date()}
          />
        </PopoverContent>
      </Popover>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

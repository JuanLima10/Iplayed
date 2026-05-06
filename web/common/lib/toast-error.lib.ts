import { toast } from 'sonner'
import { ProblemError } from '../lib/error.lib'

export function toastError(error: Error) {
  if (error instanceof ProblemError) {
    const { detail } = error

    if (Array.isArray(detail)) {
      detail.forEach((msg) => toast.error(msg))
      return
    }

    if (detail) {
      toast.error(detail)
      return
    }
  }

  toast.error(error.message || 'Unexpected error', { className: 'bg-primary' })
}

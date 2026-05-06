'use client'

import { redirectAuth } from '@/common/utils/auth-redirect.util'
import { Button, IButton } from '@/src/components/ui/button'

export function AuthRedirect({ children, ...props }: IButton) {
  return (
    <Button onClick={redirectAuth} {...props}>
      {children}
    </Button>
  )
}

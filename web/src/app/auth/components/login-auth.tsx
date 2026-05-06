'use client'

import { AuthLogin, AuthLoginSchema } from '@/common/schemas/auth.schema'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { useLoginAuth } from '@/src/hooks/auth.hook'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

export function LoginAuth() {
  const { login, isPending } = useLoginAuth()

  const { handleSubmit, control } = useForm<AuthLogin>({
    resolver: zodResolver(AuthLoginSchema),
    defaultValues: { login: '', password: '' },
    mode: 'onSubmit',
  })

  async function onSubmit(body: AuthLogin) {
    await login(body)
  }

  return (
    <form
      className="w-full space-y-6"
      onSubmit={handleSubmit(onSubmit)}
      method="post"
    >
      <Controller
        name="login"
        control={control}
        render={({ fieldState: { error }, field }) => (
          <Input
            className="h-12"
            label="Username or Email"
            placeholder="Enter your username or email"
            error={error?.message}
            required
            {...field}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ fieldState: { error }, field }) => (
          <Input
            className="h-12"
            type="password"
            label="Password"
            placeholder="Enter your password"
            error={error?.message}
            required
            {...field}
          />
        )}
      />

      <Button className="min-w-full" size="md" loading={isPending}>
        Sign In
      </Button>
    </form>
  )
}

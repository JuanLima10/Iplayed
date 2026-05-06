'use client'

import { AuthCreate, AuthCreateSchema } from '@/common/schemas/auth.schema'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'

import { useCreateAuth } from '@/src/hooks/auth.hook'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

export function CreateAuth() {
  const { create, isPending } = useCreateAuth()

  const { handleSubmit, control, trigger } = useForm<AuthCreate>({
    resolver: zodResolver(AuthCreateSchema),
    defaultValues: {
      username: '',
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onSubmit',
  })

  async function onSubmit(body: AuthCreate) {
    await create(body)
  }

  return (
    <form
      className="w-full space-y-6"
      onSubmit={handleSubmit(onSubmit)}
      method="post"
    >
      <Controller
        name="name"
        control={control}
        render={({ fieldState: { error }, field }) => (
          <Input
            className="h-12"
            label="Full Name"
            placeholder="Enter your full name"
            error={error?.message}
            required
            {...field}
          />
        )}
      />

      <Controller
        name="username"
        control={control}
        render={({ fieldState: { error }, field }) => (
          <Input
            className="h-12"
            label="Username"
            placeholder="Choose a username"
            error={error?.message}
            required
            {...field}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ fieldState: { error }, field }) => (
          <Input
            className="h-12"
            type="email"
            label="Email"
            placeholder="Enter your email"
            error={error?.message}
            required
            {...field}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ deps: ['passwordConfirm'] }}
        render={({ fieldState: { error }, field }) => (
          <Input
            className="h-12"
            type="password"
            label="Password"
            placeholder="Create a password"
            error={error?.message}
            required
            {...field}
            onChange={(e) => {
              field.onChange(e)
              trigger('password')
            }}
          />
        )}
      />

      <Controller
        name="passwordConfirm"
        control={control}
        render={({ fieldState: { error }, field }) => (
          <Input
            className="h-12"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            error={error?.message}
            required
            {...field}
            onChange={(e) => {
              field.onChange(e)
              trigger('passwordConfirm')
            }}
          />
        )}
      />

      <Button
        type="submit"
        className="min-w-full"
        size="md"
        loading={isPending}
      >
        Create Account
      </Button>
    </form>
  )
}

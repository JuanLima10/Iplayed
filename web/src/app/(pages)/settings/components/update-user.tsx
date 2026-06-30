'use client'

import { IUser } from '@/common/interfaces/user.interface'
import { UserSchemaPartial, UserUpdate } from '@/common/schemas/user.schema'
import { normalizeDefaults } from '@/common/utils/default-normalize.util'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { useUpdateUser } from '@/src/hooks/user.hook'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

export function UpdateUser(user: IUser) {
  const { update, isPending } = useUpdateUser()

  const { handleSubmit, control } = useForm<UserUpdate>({
    resolver: zodResolver(UserSchemaPartial),
    defaultValues: normalizeDefaults(user),
    mode: 'onSubmit',
  })

  async function onSubmit(body: UserUpdate) {
    await update(body)
  }

  return (
    <section className="mx-auto w-full overflow-y-auto">
      <h1 className="text-2xl font-bold sm:text-4xl">Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
        <Controller
          name="username"
          control={control}
          render={({ fieldState: { error }, field }) => (
            <Input
              label="Username"
              placeholder="Change your username..."
              error={error?.message}
              {...field}
              disabled
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ fieldState: { error }, field }) => (
            <Input
              label="Name"
              placeholder="Change your name..."
              error={error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ fieldState: { error }, field }) => (
            <Input
              label="Email"
              placeholder="Change your email..."
              error={error?.message}
              {...field}
            />
          )}
        />

        <Button className="w-fit" type="submit" size="md" loading={isPending}>
          Save
        </Button>
      </form>
    </section>
  )
}

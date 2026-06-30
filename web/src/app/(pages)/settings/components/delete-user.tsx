'use client'

import { cn } from '@/common/utils/cn.util'
import { Button, buttonVariants } from '@/src/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog'
import { useLogout } from '@/src/hooks/auth.hook'
import { useDeleteUser } from '@/src/hooks/user.hook'
import { useRouter } from 'next/navigation'

export function DeleteUser() {
  const { replace } = useRouter()

  const { remove, isPending: removing } = useDeleteUser()
  const { logout, isPending: logouting } = useLogout()
  const isPending = logouting || removing

  async function onSubmit() {
    await remove()
    await logout()
    replace('/')
  }

  return (
    <section className="mx-auto w-full space-y-6 overflow-y-auto">
      <h1 className="text-2xl font-bold sm:text-4xl">Account</h1>

      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <h2 className="mb-2 text-lg font-semibold text-destructive">
          Deactivate account
        </h2>

        <p className="text-sm text-muted-foreground">
          Your account will be temporarily deactivated.
          <br />
          No data will be deleted, however it will no longer be possible to view
          it. It will be automatically reactivated if you log in again.
        </p>
      </div>

      <Dialog>
        <div className="flex justify-end">
          <DialogTrigger
            className={cn(
              buttonVariants({ variant: 'destructive', size: 'md' }),
              'w-fit'
            )}
          >
            Deactivate my account
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm deactivation</DialogTitle>
            <DialogDescription>
              Are you sure you want to deactivate your account?
              <br />
              You can reactivate it at any time by logging in again.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={onSubmit}
              loading={isPending}
            >
              Confirm deactivation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

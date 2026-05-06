'use client'

import { IGameList } from '@/common/interfaces/game-list.interface'
import {
  GameListCreate,
  GameListSchema,
} from '@/common/schemas/game-list.schema'
import { Button } from '@/src/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog'
import { Input } from '@/src/components/ui/input'
import { useUpsertList } from '@/src/hooks/game-list.hook'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export function UpsertList({ list }: { list?: IGameList }) {
  const [open, setOpen] = useState(false)
  const { upsert, isPending } = useUpsertList()

  const { handleSubmit, control } = useForm<GameListCreate>({
    resolver: zodResolver(GameListSchema),
    defaultValues: { name: list?.name ?? '' },
  })

  async function onSubmit(body: GameListCreate) {
    await upsert(body)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex flex-col items-center gap-2.5">
        <div className="flex min-h-[133.59px] min-w-35.5 cursor-pointer items-center justify-center rounded-lg border-4 border-dotted border-border bg-card hover:opacity-75">
          <Plus />
        </div>
      </DialogTrigger>
      <DialogContent className="w-lg">
        <DialogHeader>
          <DialogTitle>
            {list ? 'Update a new list' : 'Create a new list'}
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-6 p-4">
          <Controller
            name="name"
            control={control}
            render={({ fieldState: { error }, field }) => (
              <Input
                label="Name"
                placeholder="List name..."
                error={error?.message}
                {...field}
              />
            )}
          />

          <DialogFooter className="bg-transparent">
            <DialogClose asChild>
              <Button
                className="hidden sm:block sm:w-1/2"
                variant="outline"
                size="md"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="sm:w-1/2"
              type="button"
              size="md"
              loading={isPending}
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

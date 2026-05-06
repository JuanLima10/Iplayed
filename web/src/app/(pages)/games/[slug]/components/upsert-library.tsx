'use client'

import { IGame } from '@/common/interfaces/game.interface'
import {
  UpsertLibraryForm,
  UpsertLibrarySchema,
} from '@/common/schemas/list-item.schema'
import { findItem } from '@/common/utils/item-find.util'
import { initialList } from '@/common/utils/list-initial.util'
import { Button } from '@/src/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/src/components/ui/drawer'

import { ButtonLoadMore } from '@/src/components/shared/button-load-more'
import { useGetList } from '@/src/hooks/game-list.hook'
import {
  useRemoveListItem,
  useUpsertListItem,
} from '@/src/hooks/list-item.hook'
import { zodResolver } from '@hookform/resolvers/zod'
import { ListPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ReadList } from './read-list'

export function UpsertLibrary(props: { userId: string; game: IGame }) {
  const {
    userId,
    game: { slug, title },
  } = props
  const [open, setOpen] = useState(false)

  const { lists, loadMore, isLoading } = useGetList(userId, { limit: 9 })
  const { upsert, isPending: pedingUpsert } = useUpsertListItem()
  const { remove, isPending: pedingRemove } = useRemoveListItem()

  const listIds = initialList(slug, lists)
  const isPedding = pedingUpsert || pedingRemove

  const methods = useForm<UpsertLibraryForm>({
    resolver: zodResolver(UpsertLibrarySchema),
    defaultValues: { slug },
    mode: 'onSubmit',
  })
  const { handleSubmit, reset } = methods

  useEffect(() => {
    if (lists) reset({ slug, listIds })
  }, [lists])

  async function onSubmit(body: UpsertLibraryForm) {
    const selected = body.listIds ?? []
    const toAdd = selected.filter((id) => !listIds.includes(id))
    const toRemove = listIds.filter((id) => !selected.includes(id))

    await Promise.all([
      ...toAdd.map((list_id) => upsert({ list_id, slug })),
      ...toRemove.map((list_id) => {
        const item_id = findItem(slug, list_id, lists)
        return remove({ list_id, item_id })
      }),
    ])

    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerTrigger asChild>
        <Button className="min-w-full" size="md" variant="outline">
          <ListPlus suppressHydrationWarning /> Add to list
        </Button>
      </DrawerTrigger>

      <DrawerContent className="mx-auto max-h-full w-full max-w-xl space-y-2 p-5">
        <div className="mx-auto w-full overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Add to Library</DrawerTitle>
            <DrawerDescription>{title}</DrawerDescription>
          </DrawerHeader>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-4">
              <div className="space-y-1 text-center">
                <ReadList lists={lists} loading={isLoading} />
                <ButtonLoadMore variant="link" {...loadMore} />
              </div>
              <DrawerFooter className="px-0">
                <Button type="submit" size="md" loading={isPedding}>
                  Save
                </Button>
              </DrawerFooter>
            </form>
          </FormProvider>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

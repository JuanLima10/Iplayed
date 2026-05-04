'use client'

import { IGameList } from '@/common/interfaces/game-list.interface'
import { cn } from '@/common/utils/cn.util'
import { Cover } from '@/src/components/ui/cover'
import { Check, Loader2 } from 'lucide-react'
import { useController, useFormContext } from 'react-hook-form'
import { UpsertList } from './upsert-list'

export function ReadLists(props: { lists?: IGameList[]; loading: boolean }) {
  const { lists, loading } = props

  const { control } = useFormContext()
  const { field } = useController({
    control,
    name: 'listIds',
    defaultValue: [],
  })

  function handleToggle(listId: string) {
    const current: string[] = field.value ?? []
    const next = current.includes(listId)
      ? current.filter((id) => id !== listId)
      : [...current, listId]
    field.onChange(next)
  }

  if (loading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    )
  }

  if (!lists) return null

  return (
    <div className="flex flex-wrap items-start justify-center gap-4">
      {lists.map(({ id, name, items }) => {
        const isSelected = (field.value as string[]).includes(id)

        return (
          <div
            key={id}
            className="flex flex-col items-center gap-2.5"
            onClick={() => handleToggle(id)}
          >
            <div
              className={cn(
                'relative flex min-h-[133.59px] min-w-35.5 cursor-pointer overflow-hidden rounded-lg border bg-background transition-all',
                isSelected
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-border hover:opacity-75'
              )}
            >
              {items?.slice(0, 2).map(({ game }, index) => (
                <div
                  key={game.igdbId}
                  className={index !== 0 ? '-ml-16' : ''}
                  style={{ zIndex: 2 - index }}
                >
                  <Cover
                    src={game.coverUrl}
                    alt={game.slug}
                    width={100}
                    height={50}
                  />
                </div>
              ))}

              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="rounded-full bg-primary p-1">
                    <Check size={16} className="text-primary-foreground" />
                  </div>
                </div>
              )}
            </div>

            <span
              className={cn(
                'text-sm',
                isSelected && 'font-semibold text-primary'
              )}
            >
              {name}
            </span>
          </div>
        )
      })}
      <UpsertList />
    </div>
  )
}

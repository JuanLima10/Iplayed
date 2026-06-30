'use client'

import { CommandSearch } from '@/src/components/shared/command-search'
import { CoverSkeleton } from '@/src/components/ui/cover'

import { useBestGames } from '@/src/hooks/best.hook'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { SortableBest } from './sortable-best'

export function UpsertBest({ userId }: { userId: string }) {
  const { maxBest, bestGames, addGame, removeGame, reorderGames, isLoading } =
    useBestGames(userId)

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = bestGames.findIndex((g) => g.igdbId === active.id)
    const newIndex = bestGames.findIndex((g) => g.igdbId === over.id)

    if (oldIndex !== newIndex) reorderGames(oldIndex, newIndex)
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold">Best Games</h2>
        <p className="text-muted-foreground">
          Choose up to {maxBest} favorite games and define their order.
        </p>
      </header>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={bestGames.map((g) => g.igdbId)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {isLoading && <CoverSkeleton limit={maxBest} fill />}
            {!isLoading &&
              bestGames.map((game) => (
                <SortableBest
                  key={game.igdbId}
                  game={game}
                  disabled={isLoading}
                  onRemove={removeGame}
                />
              ))}

            {!isLoading &&
              Array.from({
                length: maxBest - bestGames.length,
              }).map((_, i) => (
                <CommandSearch
                  key={i}
                  isLink={false}
                  isCoverInput
                  onSelectGame={addGame}
                />
              ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  )
}

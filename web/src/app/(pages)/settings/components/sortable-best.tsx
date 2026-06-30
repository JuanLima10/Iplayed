import { Cover } from '@/src/components/ui/cover'
import { IBestGame } from '@/src/hooks/best.hook'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { X } from 'lucide-react'
import { BestBadge } from '../../people/[username]/components/best'

export function SortableBest({
  game,
  disabled,
  onRemove,
}: {
  game: IBestGame
  disabled?: boolean
  onRemove: (game: IBestGame) => void
}) {
  const {
    setNodeRef,
    setActivatorNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({
    id: game.igdbId,
    disabled,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      <div
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <Cover
          src={game.coverUrl}
          alt={game.title}
          width={300}
          height={450}
          isText={false}
        />
      </div>

      <BestBadge position={game.best} />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onRemove(game)
        }}
        className="absolute top-2 right-2 z-10 rounded-full bg-black/70 p-1 opacity-0 transition group-hover:opacity-100"
      >
        <X className="h-4 w-4 text-white" suppressHydrationWarning />
      </button>
    </div>
  )
}

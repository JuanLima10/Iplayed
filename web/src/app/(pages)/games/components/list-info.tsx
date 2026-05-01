import { status_api } from '@/src/services/game-status.service'

export async function ListInfo({ slug }: { slug: string }) {
  const count = await status_api.count(slug)

  const items: Array<{ key: keyof typeof count; label: string }> = [
    { key: 'ratings', label: 'Rated by' },
    { key: 'played', label: 'Played by' },
    { key: 'favorites', label: 'Favorited by' },
    // { key: 'playing', label: 'Playing now' },
    // { key: 'wantPlay', label: 'Want to play' },
    // { key: 'abandoned', label: 'Abandoned by' },
  ]

  return (
    <div className="space-y-4">
      {items.map(({ key, label }) => {
        const value = count[key]
        if (value) {
          return (
            <div className="flex items-center justify-between gap-2" key={key}>
              <span className="text-xs text-card-foreground">{label}</span>

              <span className="text-sm font-bold">
                {value} {value === '1' ? 'player' : 'players'}
              </span>
            </div>
          )
        }
      })}
    </div>
  )
}

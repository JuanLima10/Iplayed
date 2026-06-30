import { IGame } from '@/common/interfaces/game.interface'
import { AuthRedirect } from '@/src/components/shared/auth-redirect'
import { status_api } from '@/src/services/game-status.service'
import { user_api } from '@/src/services/user.service'
import { ListPlus, Star } from 'lucide-react'
import { UpsertLibrary } from './upsert-library'
import { UpsertReview } from './upsert-review'

export async function GameActions(game: IGame) {
  const { slug } = game

  const me = await user_api.getMe()
  const status = me && (await status_api.getByUser(me.id, { slug }))

  const auth = [
    { Icon: Star, title: 'Rate/Review', variant: 'default' },
    { Icon: ListPlus, title: 'Add to list', variant: 'outline' },
  ] as const

  return (
    <div className="flex w-full flex-col gap-3">
      {me ? (
        <>
          <UpsertReview status={status?.data[0]} game={game} />
          <UpsertLibrary userId={me.id} game={game} />
        </>
      ) : (
        auth.map(({ Icon, title, variant }, index) => (
          <AuthRedirect key={index} size="md" variant={variant}>
            <Icon suppressHydrationWarning /> {title}
          </AuthRedirect>
        ))
      )}
    </div>
  )
}

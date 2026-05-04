import { IGame } from '@/common/interfaces/game.interface'
import { status_api } from '@/src/services/game-status.service'
import { user_api } from '@/src/services/user.service'
import { ListPlus, Star } from 'lucide-react'
import { AuthRedirect } from './auth-redirect'
import { UpsertLibrary } from './upsert-library'
import { UpsertReview } from './upsert-review'

export async function GameActions(game: IGame) {
  const { slug } = game

  const me = await user_api.getMe()
  const status = me && (await status_api.getByUser(me.id, { slug }))

  const auth = [
    { Icon: Star, title: 'Rate/Review' },
    { Icon: ListPlus, title: 'Add to list' },
  ]

  return (
    <div className="flex w-full flex-col gap-3">
      {me ? (
        <>
          <UpsertReview status={status?.data[0]} game={game} />
          <UpsertLibrary userId={me.id} game={game} />
        </>
      ) : (
        auth.map(({ Icon, title }, index) => (
          <AuthRedirect key={index}>
            <Icon /> {title}
          </AuthRedirect>
        ))
      )}
    </div>
  )
}

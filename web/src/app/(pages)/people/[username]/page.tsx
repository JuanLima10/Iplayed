import { IUserParams } from '@/common/interfaces/user.interface'
import { userTab } from '@/common/utils/tab-resolver.util'
import { user_api } from '@/src/services/user.service'
import { Banner } from './components/banner'
import { GameStatus } from './components/game-status'
import { Overview } from './components/overview'
import { Profile } from './components/profile'
import { Reviews } from './components/reviews'

export default async function UserPage({ params, searchParams }: IUserParams) {
  const { username } = await params
  const { tab, ...filters } = (await searchParams) ?? {}
  const currentTab = userTab(tab) ? tab : 'overview'

  const user = await user_api.getByUsername(username)
  const { id: userId } = user

  const props = { userId, filters }

  return (
    <main className="space-y-12 pt-56 sm:pt-0">
      <header>
        <Banner userId={userId} />
        <Profile user={user} tab={currentTab} />
      </header>

      {currentTab === 'overview' && <Overview userId={userId} />}
      {currentTab === 'reviews' && <Reviews {...props} />}

      {['playing', 'played', 'favorites', 'wishes'].includes(currentTab) && (
        <GameStatus tab={currentTab} {...props} />
      )}
    </main>
  )
}

import { IGamePageParams } from '@/common/interfaces/game.interface'
import { game_api } from '@/src/services/game.service'
import { Banner } from './components/banner'
import { CardInfo } from './components/card-info'
import { ChartRating } from './components/chart-rating'
import { GameActions } from './components/game-actions'
import { GameReview } from './components/game-review'
import { ListInfo } from './components/list-info'
import { ScreenshotGallery } from './components/screenshot-gallery'
import { SimilarGames } from './components/similar-games'
import { TabsInfo } from './components/tabs-info'

export default async function GamePage({ params }: IGamePageParams) {
  const { slug } = await params
  const game = await game_api.getBySlug(slug)

  if (game) {
    return (
      <main className="space-y-12 pt-56 sm:pt-0">
        <Banner {...game} />

        <section className="mx-auto flex max-w-360 flex-wrap gap-8 px-5 sm:gap-16 md:flex-nowrap lg:px-24">
          <TabsInfo {...game} />
          <aside className="min-w-66 space-y-10 max-md:w-full">
            <GameActions {...game} />
            <ChartRating slug={slug} />
            <ListInfo slug={slug} />
          </aside>
        </section>

        <ScreenshotGallery {...game} />

        <section className="mx-auto flex max-w-360 flex-wrap-reverse justify-between gap-8 px-5 sm:gap-16 md:flex-nowrap lg:px-24">
          <GameReview slug={slug} />
          <CardInfo {...game} />
        </section>

        <SimilarGames games={game.similarGames} />
      </main>
    )
  }
}

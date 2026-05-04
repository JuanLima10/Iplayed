import { IGame } from '@/common/interfaces/game.interface'
import { ReadMore } from '@/src/components/shared/read-more'
import { Cover } from '@/src/components/ui/cover'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs'
import Link from 'next/link'

export function TabsInfo(game: IGame) {
  const { summary, storyline, collections, franchises } = game
  const tabs = [
    { value: 'overview', enabled: true },
    { value: 'collection', enabled: !!collections?.length },
    { value: 'franchise', enabled: !!franchises?.length },
  ].filter((tab) => tab.enabled)

  return (
    <Tabs
      className="w-full sm:pt-4.5"
      values={tabs.map((t) => t.value)}
      defaultValue={tabs[0].value}
    >
      <TabsList variant="line">
        {tabs.map(({ value }) => (
          <TabsTrigger key={value} value={value}>
            {value}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="overview">
        <ReadMore
          className="my-4 sm:mt-8 sm:text-base"
          text={summary}
          maxLength={700}
        />
        {storyline && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase">Storyline</h3>
            <ReadMore
              className="sm:text-base"
              text={storyline}
              maxLength={175}
            />
          </div>
        )}
      </TabsContent>

      {collections && collections.length > 0 && (
        <TabsContent className="mt-6 space-y-8" value="collection">
          {collections.map(({ type, games }) => (
            <div className="space-y-3" key={type}>
              <h3 className="text-sm font-bold uppercase">{type}</h3>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {games.map(({ igdbId, title, slug, coverUrl }) => (
                  <Link key={igdbId} href={`/games/${slug}`}>
                    <Cover
                      src={coverUrl}
                      alt={title}
                      width={150}
                      height={200}
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      )}

      {franchises && franchises.length > 0 && (
        <TabsContent className="mt-6 space-y-8" value="franchise">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {franchises.map(({ igdbId, title, slug, coverUrl }) => (
              <Link key={igdbId} href={`/games/${slug}`}>
                <Cover src={coverUrl} alt={title} width={150} height={200} />
              </Link>
            ))}
          </div>
        </TabsContent>
      )}
    </Tabs>
  )
}

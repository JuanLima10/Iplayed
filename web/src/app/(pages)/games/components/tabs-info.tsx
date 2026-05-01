import { IGame } from '@/common/interfaces/game.interface'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs'

export function TabsInfo(game: IGame) {
  const { screenshots } = game
  const tabs = ['summary', 'dlc', 'series']

  return (
    <Tabs className="w-full sm:pt-4.5" values={tabs} defaultValue={tabs[0]}>
      <TabsList variant="line">
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={tabs[0]}>
        <p className="mt-4 sm:mt-8 sm:text-base">{game.summary}</p>
      </TabsContent>
    </Tabs>
  )
}

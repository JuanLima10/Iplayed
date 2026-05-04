import { IGame } from '@/common/interfaces/game.interface'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'

export function CardInfo(game: IGame) {
  const { genres, publishers, themes } = game

  const sections: Array<{ title: string; values?: string[] }> = [
    { title: 'Genres', values: genres },
    { title: 'Themes', values: themes },
    { title: 'Publishers', values: publishers },
  ]

  return (
    <div className="flex h-fit w-full min-w-66 flex-1 flex-wrap justify-center gap-4 sm:justify-start">
      {sections.map(
        ({ title, values }) =>
          values?.length && (
            <Card key={title} className="w-full gap-2 sm:w-66">
              <CardHeader>
                <CardTitle className="text-xs font-bold text-primary uppercase">
                  {title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-1 text-base font-bold">
                {values.map((value, index) => (
                  <span key={index}>{value}</span>
                ))}
              </CardContent>
            </Card>
          )
      )}
    </div>
  )
}

import { IGameList } from '@/common/interfaces/game-list.interface'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import { ScrollText } from 'lucide-react'
import Link from 'next/link'
import { SectionTitle } from './section-title'

export function ReadList({ lists }: { lists?: { data?: IGameList[] } }) {
  if (!lists?.data?.length) return null

  return (
    <div className="w-full space-y-6">
      <SectionTitle variant="icon" icon={ScrollText}>
        Lists
      </SectionTitle>

      <div className="flex w-full flex-wrap gap-4">
        {lists.data.map(({ id, name, items, user }) => (
          <Link
            className="w-full"
            key={id}
            href={`/people/${user.username}?tab=lists`}
          >
            <Card className="w-full gap-1 bg-transparent p-0 hover:bg-card sm:w-[320px]">
              <CardContent className="p-4">
                <CardHeader className="px-0 pb-2">
                  <CardTitle className="text-sm">{name}</CardTitle>
                </CardHeader>

                <div className="flex justify-between gap-2">
                  <CardDescription className="text-secondary">
                    {items?.length ?? 0} Games
                  </CardDescription>

                  <span className="text-secondary-foreground">
                    by {user.username}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import { list_api } from '@/src/services/game-list.service'
import { ScrollText } from 'lucide-react'
import Link from 'next/link'

export async function List({ userId }: { userId: string }) {
  const lists = await list_api.getByUser(userId, { limit: 8 })

  return (
    <div className="w-full space-y-6">
      <h1 className="flex items-center gap-2 text-lg font-bold text-foreground">
        <ScrollText className="text-primary" suppressHydrationWarning />
        Lists
      </h1>

      <div className="flex w-full flex-wrap gap-4">
        {lists?.data?.map(({ id, name, items, user }) => (
          <Card
            className="w-full gap-1 bg-transparent p-0 hover:bg-card sm:w-[320px]"
            key={id}
          >
            <Link href={id}>
              <CardContent className="p-4">
                <CardHeader className="px-0">
                  <CardTitle className="text-sm">{name}</CardTitle>
                </CardHeader>
                <div className="flex justify-between gap-2">
                  <CardDescription className="text-secondary">
                    {items?.length} Games
                  </CardDescription>
                  <span className="text-secondary-foreground">
                    by {user.name}
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

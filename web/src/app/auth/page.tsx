import { Discord } from '@/src/components/shared/discord'
import { Card, CardContent } from '@/src/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs'
import Image from 'next/image'
import Link from 'next/link'
import { CreateAuth } from './components/create-auth'
import { LoginAuth } from './components/login-auth'

export default function Auth() {
  return (
    <main className="flex h-full min-h-svh flex-col items-center justify-center gap-8 px-5">
      <div className="absolute -z-10 h-full w-full bg-[url('/background-auth.png')] bg-center bg-no-repeat opacity-20"></div>
      <Link href="/home">
        <Image
          className="mx-auto"
          src="/logo.png"
          alt="IPlayed"
          width={172}
          height={48}
          suppressHydrationWarning
        />
      </Link>

      <Card className="w-full max-w-sm bg-popover">
        <CardContent className="space-y-4">
          <Tabs defaultValue="sign-in">
            <TabsList className="w-full" variant="line">
              <TabsTrigger className="flex-1" value="sign-in">
                Sign In
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="sign-up">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sign-in" className="pt-4">
              <LoginAuth />
            </TabsContent>

            <TabsContent value="sign-up" className="pt-4">
              <CreateAuth />
            </TabsContent>
          </Tabs>
          <Discord />
        </CardContent>
      </Card>
    </main>
  )
}

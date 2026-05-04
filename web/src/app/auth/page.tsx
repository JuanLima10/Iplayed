import { NavBar } from '@/src/components/shared/nav-bar'
import { SignIn } from '@/src/components/shared/sign-in'
import Image from 'next/image'

export default function Auth() {
  return (
    <>
      <NavBar />
      <main className="flex min-h-svh flex-col items-center justify-center gap-8">
        <div className="absolute -z-10 h-full w-full bg-[url('/background-auth.png')] bg-center bg-no-repeat opacity-20"></div>
        <section className="space-y-4 text-center">
          <Image
            className="mx-auto"
            src="/logo.png"
            alt="IPlayed"
            width={172}
            height={48}
            suppressHydrationWarning
          />
          <p className="text-base font-medium">Please sign in to go</p>
          <SignIn />
        </section>
      </main>
    </>
  )
}

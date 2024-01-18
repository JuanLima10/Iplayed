import Image from 'next/image';

export default function Login() {
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-8">
      <div className="absolute -z-10 w-full h-full bg-[url('/background-login.png')] bg-center bg-no-repeat opacity-20"></div>
      <Image src="/logo.png" alt="IPlayed Logo" width={261} height={60} />
      <div className="flex flex-col items-center">
        <span className="font-bold text-lg text-white-100">Login</span>
        <p className="font-normal text-sm text-white-100">Please sign in to continue.</p>
      </div>
      <a className="flex items-center justify-center gap-1 font-semibold text-sm text-white-100 bg-purple-discord rounded-full py-2 px-8 transition-colors hover:bg-blue-900" href={process.env.NEXT_PUBLIC_DISCORD_LINK}>
        <Image src="/discord-logo.png" alt="Discord Logo" width={24} height={16} />
        Sign In with<b>Discord</b>
      </a>
    </main>
  )
}
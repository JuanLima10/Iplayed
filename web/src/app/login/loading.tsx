export default function LoginLoading() {
  return (
    <main className="animate-pulse h-screen flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center">
        <div className="w-[80px] h-8 bg-slate-700 rounded-full mb-2"></div>
        <div className="w-[200px] h-4 bg-slate-700 rounded-full"></div>
      </div>
      <div className="w-[243px] h-8 bg-slate-700 rounded-full"></div>
    </main>
  )
}
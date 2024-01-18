'use client'
export default function Error({ error, reset, }: { error: Error, reset: () => void }) {
  return (
    <div className="w-full flex flex-col items-center gap-4 fixed top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 px-5">
      <span className="font-bold text-xl text-center text-white-200 responsive:text-md">Something went wrong!</span>
      <button className="font-semibold text-center text-black-100 bg-blue-300 rounded-full py-2 px-7 transition-colors hover:text-white-100 hover:bg-blue-700" onClick={() => reset()}>
        Reload page
      </button>
    </div>
  )
}
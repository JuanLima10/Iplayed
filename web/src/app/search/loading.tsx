export default function SearchLoading() {
  return (
    <main className="max-w-[2160px] h-full animate-pulse mx-auto pt-28 px-16 overflow-hidden responsive:px-5">
      <header>
      <div className="flex items-center h-11 gap-2">
          <div className="w-16 h-6 bg-slate-700 rounded-lg"></div>
          <div className="w-16 h-6 bg-slate-700 rounded-lg"></div>
        </div>
        <div className="h-[2px] bg-slate-700"></div>
      </header>
      <section className="flex flex-wrap gap-2 responsive:flex-col pt-4">
        {[...Array(12)].map((search, index) =>
          <div key={index} className="flex items-start min-w-[475px] responsive:w-full responsive:min-w-0">
            <div className="w-[75px] max-w-full h-[100px] bg-slate-700 rounded-md"></div>
            <div className="pt-1 px-2">
              <div className="w-48 h-5 bg-slate-700 rounded-lg"></div>
              <div className="w-12 h-5 bg-slate-700 rounded-full mt-1"></div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
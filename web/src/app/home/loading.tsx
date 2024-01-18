export default function HomeLoading() {
  return (
    <main className="flex flex-col max-w-[2160px] animate-pulse mx-auto pt-[77px]">
      <header className="mt-8 mx-16 responsive:mx-5">
        <div className="w-56 h-8 mb-4 bg-slate-700 rounded-full"></div>
        <div className="w-72 h-5 bg-slate-700 rounded-full"></div>
      </header>
      <section>
        <div className="w-36 h-5 bg-slate-700 rounded-xl mt-10 mx-16 responsive:mt-8 responsive:mx-5"></div>
        <div className="overflow-hidden mt-8 ml-16 responsive:mt-[10px] responsive:ml-5">
          <div className="w-full flex items-center justify-start gap-8 responsive:gap-4">
            {[...Array(9)].map((popular, index) => (
              <div key={index} className="min-w-[200px] h-[255px] bg-slate-700 rounded-lg responsive:min-w-[140px] responsive:h-[185px]"></div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="w-36 h-5 bg-slate-700 rounded-xl mt-10 mx-16 responsive:mt-8 responsive:mx-5"></div>
        <div className="overflow-hidden mt-8 ml-16 responsive:mt-[10px] responsive:ml-5">
          <div className="w-full flex items-center justify-start gap-8 responsive:gap-4">
            {[...Array(9)].map((bestRatings, index) => (
              <div key={index} className="min-w-[200px] h-[255px] bg-slate-700 rounded-lg responsive:min-w-[140px] responsive:h-[185px]"></div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
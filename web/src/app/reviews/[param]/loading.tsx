export default function Loading() {
  return (
    <main className="max-w-[1440px] flex flex-wrap items-start justify-center gap-8 animate-pulse mx-auto p-16 pt-28 responsive:justify-center responsive:px-5">
      <div className="w-[255px] h-[339px] bg-slate-700 rounded-lg"></div>
      <section className="w-[800px] max-w-full">
        <div className="w-[378px] max-w-full h-8 bg-slate-700 rounded-full responsive:h-5"></div>
        <div className="w-full max-w-[800px] mt-4">
          {[...Array(4)].map((reviews, index) => (
            <div className="max-w-full flex items-start gap-2" key={index}>
              <div className="w-[46px] h-[42px] bg-slate-700 rounded-full mt-4"></div>
              <div className="w-full h-36 bg-slate-700 rounded-lg mt-4"></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
export default function Loading() {
  return (
    <main className="max-w-[1440px] flex flex-col items-center gap-5 animate-pulse mx-auto pt-16">
      <section className="flex items-start justify-center gap-8 mx-5 pt-16 responsive:gap-5 small-screen:flex-wrap-reverse">
        <div className="w-[350px] max-w-full">
          <div className="w-[300px] max-w-full h-6 bg-slate-700 rounded-full responsive:h-5"></div>
          <div className="w-[110px] max-w-full h-5 bg-slate-700 rounded-full mt-8 responsive:h-[14px] responsive:mt-4"></div>
          <div className="w-[34px] h-[34px] bg-slate-700 rounded-md mt-2 responsive:w-5 responsive:h-5"></div>
          <div className="w-[162px] max-w-full h-[39px] bg-slate-700 rounded-lg mt-2"></div>
        </div>
        <div className="w-[200px] max-w-full h-[266px] bg-slate-700 rounded-lg"></div>
      </section>
      <div className="flex flex-col items-end">
        <div className="w-[582px] max-w-full h-80 bg-slate-700 rounded-lg"></div>
        <div className="w-[108px] max-w-full h-10 bg-slate-700 rounded-full mt-4"></div>
      </div>
    </main>
  )
}
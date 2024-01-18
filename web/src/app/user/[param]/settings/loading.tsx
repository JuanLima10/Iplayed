export default function LoadingSettings() {
  return (
    <main className="max-w-[1440px] flex items-start gap-10 animate-pulse mx-auto pt-32 px-16 navbar:flex-col responsive:pt-28 responsive:p-5">
      <section className="w-full mt-4">
        <div className="w-[268px] max-w-full h-8 bg-slate-700 rounded-full responsive:h-6"></div>
        {[...Array(3)].map((form, index) => (
          <div className="mt-4" key={index}>
            <div className="w-20 h-4 bg-slate-700 rounded-full"></div>
            <div className="w-full h-7 bg-slate-700 rounded-full mt-1"></div>
          </div>
        ))}
        <div className="w-[148px] max-w-full h-8 bg-slate-700 rounded-full mt-8"></div>
      </section>
      <section className="w-[1080px] max-w-full text-center mt-4 mx-auto">
        <div className="w-[268px] max-w-full h-8 bg-slate-700 rounded-full responsive:h-6"></div>
        <div className="w-full flex flex-wrap items-center gap-4 mt-4 navbar:justify-center">
          {[...Array(4)].map((fav, index) => (
            <div className="w-[120px] h-[160px] bg-slate-700 rounded-lg responsive:w-[65px] responsive:h-[90px]" key={index}></div>
          ))}
        </div>
      </section>
    </main>
  )
}
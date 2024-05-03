export default function Loading() {
  return (
    <div className="animate-pulse h-screen overflow-hidden w-full">
      <main className="flex flex-col max-w-[2160px] w-full mx-auto responsive:items-center">
        <div className="relative">
          <div className="w-full h-[450px] bg-current responsive:h-60"></div>
          <div className="w-full h-[450px] absolute top-0 bg-linear-t-blue responsive:h-60"></div>
          <section className="max-w-[1440px] flex justify-center gap-8 mx-auto px-16 responsive:px-5">
            <div className="flex flex-col items-center gap-[10px] z-10 -mt-40 responsive:-mt-16">
              <div className="min-w-[215px] h-[300px] bg-slate-700 rounded-lg shadow-md responsive:min-w-[130px] responsive:h-[190px]"></div>
              <div className="flex items-start justify-center gap-4">
                {[...Array(3)].map((text, index) => (
                  <div className="flex flex-col items-center gap-1" key={index}>
                    <div className="h-5 w-5 bg-slate-700 rounded"></div>
                    <div className="h-2 w-5 bg-slate-700 rounded-full my-1"></div>
                  </div>
                ))}
              </div>
              <div className="w-full flex flex-col items-center justify-center gap-4 mt-2">
                <div className="w-full h-12 bg-slate-700 rounded-full px-4"></div>
                <div className="w-full h-12 bg-slate-700 rounded-full px-4"></div>
                <div className="w-full h-12 bg-slate-700 rounded-full px-4"></div>
              </div>
            </div>
            <div className="w-full flex flex-col items-start gap-2 mt-4">
              <p className="h-4 w-full bg-slate-700 rounded-xl"></p>
              <p className="h-4 w-40 bg-slate-700 rounded-xl"></p>
              <p className="h-4 w-full bg-slate-700 rounded-xl"></p>
              <p className="h-4 w-full bg-slate-700 rounded-xl"></p>
              <p className="h-4 w-full bg-slate-700 rounded-xl"></p>
              <p className="h-4 w-full bg-slate-700 rounded-xl"></p>
              <div className="w-24 h-4 bg-slate-700 rounded-full px-4 mt-6"></div>
              <div className="w-full flex items-center gap-2">
                <div className="w-full h-44 bg-slate-700 rounded-lg m-1 navbar:h-24"></div>
                <div className="w-[105px] h-44 bg-slate-700 rounded-lg m-1 navbar:h-24 responsive:hidden"></div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <section className="relative max-w-[2160px] mt-8 ml-16 mb-4 responsive:mx-5">
        <div className="w-full relative flex items-center justify-start gap-4 my-8 responsive:mb-0">
          {[...Array(9)].map((game, index) => (
            <div key={index} className="min-w-[450px] h-[253px] bg-slate-700 rounded-lg responsive:hidden"></div>
          ))}
          <div className="min-w-full h-[200px] hidden bg-slate-700 rounded-lg responsive:block"></div>
        </div>
      </section>

      <section className="w-full max-w-[1440px] flex items-start justify-between gap-6 mx-auto px-16 navbar:flex-col navbar:items-center navbar:gap-0 responsive:mt-2 responsive:px-0">
        <div className="w-full max-w-full mb-8 mr-10 responsive:mb-4 responsive:mx-5">
          <div className="w-24 h-4 bg-slate-700 rounded-xl mt-8 responsive:mx-5"></div>
          <div className="w-full flex flex-col items-start justify-center gap-4 pt-8 px-5">
            {[...Array(3)].map((infos, index) => (
              <div className="w-full flex items-start gap-4 responsive:gap-1" key={index}>
                <div className="w-full max-w-[42px] h-[42px] bg-slate-700 rounded-full"></div>
                <div className="w-full h-36 bg-slate-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 animate-pulse mt-8 navbar:justify-start responsive:w-full">
          <div className="w-32 h-4 bg-slate-700 rounded-xl mb-4 responsive:mx-5"></div>
          <div className="flex gap-4 rounded-lg responsive:w-full responsive:px-5 small-screen:flex-col">
            <ol className="w-44 max-w-full h-52 bg-slate-700 rounded-lg pt-2 px-3 pb-4 small-screen:w-full"></ol>
            <ol className="w-44 max-w-full h-52 bg-slate-700 rounded-lg pt-2 px-3 pb-4 small-screen:w-full"></ol>
          </div>
          <div className="flex gap-4 rounded-lg responsive:w-full responsive:px-5 small-screen:flex-col">
            <ol className="w-44 max-w-full h-52 bg-slate-700 rounded-lg pt-2 px-3 pb-4 small-screen:w-full"></ol>
            <ol className="w-44 max-w-full h-52 bg-slate-700 rounded-lg pt-2 px-3 pb-4 small-screen:w-full"></ol>
          </div>
        </div>
      </section>

      <footer className="max-w-[2160px] ml-16 mb-4 responsive:ml-5">
        <div className="h-4 w-72 bg-slate-700 rounded-xl my-8"></div>
        <div className="w-full h-[255px] bg-slate-700 rounded-l-lg responsive:h-52"></div>
      </footer>
    </div>
  )
}
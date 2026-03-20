function SongSkeleton() {
    return (
          <section className="">
            {/* <h2 className="mb-8 text-5xl font-medium tracking-tight text-white md:text-7xl">Top Songs</h2> */}
           
            {/* <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="p-3 mb-16 bg-black border">
                <option value="short_term">Last Month</option>
                <option value="medium_term">Last 6 Months</option>
                <option value="long_term">Last Year</option>
            </select> */}

            <div className="w-4/5 h-12 mb-16 bg-white/20 animate-pulse"> </div>

            <ul className="grid grid-cols-1 grid-rows-3 gap-5 md:grid-cols-2 lg:grid-cols-5">
           {Array.from({ length: 20 }).map((_) => (
                <li className="mb-2 ">
                    {/* <p>{index + 1} </p> */}

                    <div className="flex space-x-2">                           
                        <div className="w-12 h-12 rounded-sm bg-zinc-800 animate-pulse" ></div>                       
                        <div className="flex flex-col justify-center space-y-3 ">
                            <div className="w-24 h-5 bg-white/20 animate-pulse"></div>
                            <div className="w-24 h-4 bg-white/20 animate-pulse">
                            </div>
                        </div>
                    </div>
                </li>
            ))}
            </ul>
        </section>
    )
}

export default SongSkeleton
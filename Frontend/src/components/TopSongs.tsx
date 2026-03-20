import { useState,useEffect } from "react";
import SongSkeleton from "./skeleton/SongsSkeleton";

function TopSongs() {

    interface Songs {
        items: {
            name: string;
            artists: {
                name: string;
            }[];
            album: {
                images: {
                    url: string;
                    height: number;
                }[]
            }

        }[];
    }

   const [topSongs, setTopSongs] = useState<Songs | null>(null);
   const [timeRange, setTimeRange] = useState<string>("medium_term");
   const [loading, setLoading] = useState(true)
   const API_URL = import.meta.env.VITE_API_URL

   useEffect(() => {      
    const token = localStorage.getItem("jwt_token");
    setLoading(true)
    const fetchTopSongs = async () => {
        try {
            const response = await fetch(`${API_URL}/top-songs?time_range=${timeRange}`, {
              headers: { 
                Authorization: `Bearer ${token}`
            }
            })
            const data = await response.json();
            setTopSongs(data);
            setLoading(false)

        } catch (error) {
            console.log(error); 
        }
    }

    fetchTopSongs();
   }, [timeRange])

   const topThreeSongs: Songs['items'] = topSongs?.items.slice(0,3) || [];

    return(
        <section className="px-5 md:px-16">
            <h2 className="mb-8 text-5xl font-medium tracking-tight text-white md:text-7xl">Your Favourite Songs</h2>
           
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="p-3 mb-16 bg-black border">
                <option value="short_term">Last Month</option>
                <option value="medium_term">Last 6 Months</option>
                <option value="long_term">Last Year</option>
            </select>

            { loading ?  <SongSkeleton /> : (

                <>
            <p className="mb-16 text-5xl">Your Top 3 Songs are "<span className="font-bold ">{topThreeSongs[0]?.name}</span>", "<span className="font-bold ">{topThreeSongs[1]?.name}</span>", and "<span className="font-bold ">{topThreeSongs[2]?.name}</span>".  </p>

            <ul className="grid grid-cols-1 grid-rows-3 gap-5 md:grid-cols-2 lg:grid-cols-5">
            {topSongs?.items.map((song, index) => (
                <li className="mb-2 ">
                    {/* <p>{index + 1} </p> */}

                    <div className="flex space-x-2">                           
                        <img src={song.album.images[0]?.url} alt={song.name} className="h-12 rounded-sm" />                       
                        <div className="flex flex-col justify-center ">
                            <p>{song.name}</p>
                            <p className="text-sm text-white/60">
                                {song.artists.map((artist) => artist.name).join(", ")}
                            </p>
                        </div>
                    </div>
                </li>
            ))}
            
            </ul>
            </>
        )}
        </section>
    )
}

export default TopSongs
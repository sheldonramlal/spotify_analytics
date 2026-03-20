import { useState,useEffect } from "react";
import SongSkeleton from "./skeleton/SongsSkeleton";

function TopSongs() {

    interface RecentlyPlayed {
        items: {
           played_at_human: string;
           track: {
                name: string;
                artists: {
                    name: string;
                }[];
                album: {
                    images: {
                        url: string;
                    }[];
                }

           }

        }[];
    }

    const [recentSongs, setRecentSongs] = useState<RecentlyPlayed | null>(null);
    const [loading, setLoading] = useState(true)
    const API_URL = import.meta.env.VITE_API_URL
    
    useEffect(() => {
        
    const token = localStorage.getItem("jwt_token");
    setLoading(true)
    const fetchTopSongs = async () => {
        try {
            const response = await fetch(`${API_URL}/recentlyplayed`, {
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json();
            setRecentSongs(data);
            setLoading(false)

        } catch (error) {
            console.log(error);
            
        }
    }

    fetchTopSongs();
   }, [])


    return(
        <section className="px-5 my-20 md:px-16 ">
            <h2 className="mb-16 text-5xl font-medium tracking-tight text-white md:text-7xl">Your Recently Played Songs</h2>

            { loading ? <SongSkeleton /> : (

                
            <ul className="grid grid-cols-1 grid-rows-3 gap-5 md:grid-cols-2 lg:grid-cols-5">
            {recentSongs?.items.map((song) => (
                <li className="mb-2 ">
                    {/* <p>{index + 1} </p> */}

                    <div className="flex space-x-2">                           
                        <img src={song.track.album.images[0]?.url} alt={song.track.name} className="h-12 rounded-sm" />                       
                        <div className="flex flex-col justify-center ">
                            <p>{song.track.name}</p>
                            <p className="text-sm text-white/60">
                                {song.track.artists.map((artist) => artist.name).join(", ")}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-white/60">Played {song.played_at_human}</p>
                </li>
            ))}
            </ul>
        )}
        </section>
    )
}

export default TopSongs
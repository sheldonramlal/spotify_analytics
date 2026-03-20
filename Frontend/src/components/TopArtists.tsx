import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import TopArtistsSkeleton from "./skeleton/TopArtistSkeleton";

import "swiper/css";
import 'swiper/css/navigation';

function TopArtists() {

   interface TopArtists {
        items: {
            href: string;
            name: string;
            images: {
                url: string;
                height: number;
                width: number;
            }[];
        }[];
   }

   const [topArtists, setTopArtists] = useState<TopArtists | null>(null);
   const [loading, setLoading] = useState(true)
   const API_URL = import.meta.env.VITE_API_URL

   useEffect(() => {
     
    const token = localStorage.getItem("jwt_token");
    setLoading(true)
    const fetchTopArtists = async () => {
        try {
            const response = await fetch(`${API_URL}/top-artists`, {
                headers: {
                   Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json();
            setTopArtists(data);
            setLoading(false)
        } catch (error) {
            console.log(error);
            
        }
    }

    fetchTopArtists();
   }, [])

    return(
      <>
     
      
        
    <section  className='my-20 md:my-10'>
        <div className='px-5 mb-16 md:px-16'>
            <h2 className='text-5xl font-medium tracking-tight text-white md:text-7xl'>Your Most Listened Artists</h2>
        </div>

      {loading ? <TopArtistsSkeleton /> : (

        <div className="pl-5 overflow-hidden md:pl-0 md:ml-16">
            {/* Swiper */}
            <Swiper
              modules={[Navigation, FreeMode]}
              slidesPerView="auto"
              spaceBetween={24}
              // freeMode={true}
              grabCursor={true}
              navigation={{
                prevEl: ".swiper-prev",
                nextEl: ".swiper-next",
              }}
              className="!overflow-visible"
            >
              
              {topArtists?.items.map((artist) => (
                <SwiperSlide
                  key={artist.href}
                  className="w-full md:!w-[300px] "
                >
                  
                   <div className="project-card">
                      <div  className="h-[450px] pr-5 md:px-0 overflow-hidden ">
                        <img
                          src={artist.images[0].url}
                          alt={artist.name}
                          className="object-cover w-full h-full rounded-md"
                        />
                      </div>
                      <div className='flex py-5 justify-left'>
                        <h3 className='font-medium tracking-wide text-white uppercase '>
                          {artist.name}
                        </h3>
                      </div>
                    </div>
                    
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-4 px-5 mt-2 md:px-16">
              <button className="px-3 py-3 transition border rounded-full swiper-prev border-white/20 hover:bg-zinc-800 hover:text-black">
               <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.79889 24H41.7989" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.7988 36L5.79883 24L17.7988 12" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <button className="px-3 py-3 text-white transition border rounded-full swiper-next border-white/20 hover:bg-zinc-800 hover:text-black">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M41.9999 24H5.99994" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 12L42 24L30 36" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
    </div> )}
    </section>
     </>
    )
}

export default TopArtists
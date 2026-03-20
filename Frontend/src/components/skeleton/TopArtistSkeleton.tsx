import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';

function TopArtistsSkeleton() {
  return (
    <section className="my-20 md:my-10">
      {/* <div className="px-5 mb-16 md:px-16">
        <div className="w-64 h-10 rounded bg-zinc-800 animate-pulse md:h-14 md:w-96"></div>
      </div> */}

      <div className="pl-5 overflow-hidden md:pl-0 md:ml-16">
        <Swiper
          slidesPerView="auto"
          spaceBetween={24}
          className="!overflow-visible"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SwiperSlide
              key={i}
              className="w-full md:!w-[300px]"
            >
              <div className="project-card">
                
                {/* Image Skeleton */}
                <div className="h-[450px] pr-5 overflow-hidden md:px-0">
                  <div className="w-full h-full rounded-md bg-zinc-800 animate-pulse"></div>
                </div>

                {/* Text Skeleton */}
                <div className="flex py-5 justify-left">
                  <div className="w-32 h-4 rounded bg-zinc-800 animate-pulse"></div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons (optional skeleton state) */}
        <div className="flex justify-end gap-4 px-5 mt-2 md:px-16">
          <div className="w-[48px] h-[48px] rounded-full bg-zinc-800 animate-pulse"></div>
          <div className="w-[48px] h-[48px] rounded-full bg-zinc-800 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default TopArtistsSkeleton
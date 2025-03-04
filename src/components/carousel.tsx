import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import service from "../service";

const Index = () => {
   const [movies, setMovies] = useState<any[]>([]);

   useEffect(() => {
      const fetchTrendingMovies = async () => {
         try {
            const res = await service.get("/trending/movie/week");
            setMovies(res.data.results);
         } catch (error) {
            console.error("Error fetching trending movies", error);
         }
      };

      fetchTrendingMovies();
   }, []);

   return (
      <div className="container mx-auto my-10 relative">
         <h2 className="mb-6 text-2xl font-bold text-center sm:text-left">
            Trending Movies
         </h2>
         <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 2500 }}
            pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
               320: { slidesPerView: 1 },
               480: { slidesPerView: 2 },
               768: { slidesPerView: 3 },
               1024: { slidesPerView: 4 },
               1280: { slidesPerView: 5 },
            }}
            className="px-2 sm:px-4"
         >
            {movies.map((movie) => (
               <SwiperSlide key={movie.id} className="relative group">
                  <img
                     src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                     alt={movie.title}
                     className="rounded-lg shadow-lg w-full h-auto object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center p-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                     {movie.title}
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

export default Index;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Service from "../service";
import { Spinner } from "../components";
import { NotFound } from "../pages";

interface Movies {
   id: number;
   title: string;
   poster_path: string;
   overview: string;
   genres: { id: number; name: string }[];
   vote_average: number;
   release_date: string;
   budget: number;
   revenue: number;
   videos: any;
   runtime: number;
   vote_count: number;
}

const MovieDetails = () => {
   const { id } = useParams();
   const [movie, setMovie] = useState<Movies | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   useEffect(() => {
      const fetchMovieDetails = async () => {
         try {
            const res = await Service.get(
               `/movie/${id}?append_to_response=videos`
            );
            setMovie(res.data);
            console.log(res.data);
         } catch (error) {
            console.error("Error fetching movie details:", error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchMovieDetails();
   }, [id]);

   if (isLoading)
      return (
         <div className="flex justify-center items-center h-screen">
            <Spinner />
         </div>
      );

   if (!movie) return <NotFound />;

   const {
      title,
      release_date,
      poster_path,
      runtime,
      vote_count,
      vote_average,
   } = movie;

   const trailer = movie.videos?.results.find(
      (vid: any) => vid.type === "Trailer"
   );

   return (
      <div className="max-w-7xl mx-auto p-6 text-white">
         <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
               <div>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-4 ">
                     {title}
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:gap-2 sm:items-center">
                     <p className="text-[#A8B5DB]">{release_date}</p>
                     <span className="hidden sm:block text-sm text-gray-100">
                        •
                     </span>
                     <p className="text-[#A8B5DB]">
                        {Math.floor(movie.runtime / 60)}h {runtime % 60}
                        min
                     </p>
                  </div>
               </div>
               <div className="flex flex-col sm:flex-row sm:gap-1 sm:items-center bg-[#221F3D] py-2 px-4 rounded-lg">
                  <p className="font-bold ">
                     ⭐{vote_average.toFixed(1)}
                     <span className="text-[#A8B5DB] font-medium">/10</span>
                  </p>
                  <p className="text-[#A8B5DB]">({vote_count})</p>
               </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
               <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  className="rounded-lg md:w-[30%] h-auto object-cover "
               />
               <div className="md:w-[70%] ">
                  {trailer ? (
                     <iframe
                        className="w-full h-140 rounded-lg"
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title="Movie Trailer"
                        allowFullScreen
                     ></iframe>
                  ) : (
                     <div className="w-full h-140 rounded-lg flex justify-center items-center bg-gray-800">
                        <p className="text-gray-400 text-lg">
                           🎥 Video not found
                        </p>
                     </div>
                  )}
               </div>
            </div>
            <div className="mt-6 flex flex-col ">
               <h2 className="text-2xl font-bold">Overview</h2>
               <p className="text-[#A8B5DB] mt-2">{movie.overview}</p>
            </div>
         </div>
      </div>
   );
};

export default MovieDetails;

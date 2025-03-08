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

   const trailer = movie.videos?.results.find(
      (vid: any) => vid.type === "Trailer"
   );

   return (
      <div className="max-w-6xl mx-auto p-6 text-white">
         <h1 className="text-4xl font-bold mb-4 ">{movie.title}</h1>
         <div className="flex flex-col md:flex-row gap-6">
            <img
               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
               alt={movie.title}
               className="rounded-lg shadow-lg w-full md:w-1/3"
            />
            <div className="flex-1">
               {trailer ? (
                  <iframe
                     src={`https://www.youtube.com/embed/${trailer.key}`}
                     title="Movie Trailer"
                     className="w-full h-64 md:h-80 rounded-lg"
                     allowFullScreen
                  ></iframe>
               ) : (
                  <div className="w-full h-64 md:h-80 flex justify-center items-center bg-gray-800 rounded-lg">
                     <p className="text-gray-400 text-lg">🎥 Video not found</p>
                  </div>
               )}

               <p className="mt-4 text-gray-400">{movie.overview}</p>
               <div className="mt-4 flex gap-2 flex-wrap">
                  {movie.genres.map((genre) => (
                     <span
                        key={genre.id}
                        className="bg-purple-700 px-3 py-1 rounded-full text-sm"
                     >
                        {genre.name}
                     </span>
                  ))}
               </div>
               <p className="mt-4">⭐ {movie.vote_average} / 10</p>
               <p className="mt-2">🎬 Release Date: {movie.release_date}</p>
               <p className="mt-2">
                  💰 Budget: ${movie.budget?.toLocaleString()}
               </p>
               <p className="mt-2">
                  💵 Revenue: ${movie.revenue?.toLocaleString()}
               </p>
            </div>
         </div>
      </div>
   );
};

export default MovieDetails;

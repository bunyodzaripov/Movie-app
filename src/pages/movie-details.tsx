import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../service";

const Index = () => {
   const { id } = useParams();
   const [movie, setMovie] = useState<any>(null);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   useEffect(() => {
      const fetchMovieDetails = async () => {
         try {
            const res = await service.get(`/movie/${id}`);
            setMovie(res.data);
         } catch (error) {
            console.error("Error fetching movie details:", error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchMovieDetails();
   }, [id]);

   if (isLoading) return <p className="text-center text-white">Loading...</p>;
   if (!movie) return <p className="text-center text-white">Movie not found</p>;

   return (
      <div className="max-w-4xl mx-auto p-6 text-white">
         <h1 className="text-3xl font-bold">{movie.title}</h1>
         <p className="text-gray-400">
            {movie.release_date} | ⭐ {movie.vote_average}
         </p>
         <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
            className="my-4 rounded-lg shadow-lg"
         />
         <p className="text-lg">{movie.overview}</p>
      </div>
   );
};

export default Index;

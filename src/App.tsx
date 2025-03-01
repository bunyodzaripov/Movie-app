import { useEffect, useState } from "react";
import Search from "./components/search";
import MovieCard from "./components/movieCard";
import Spinner from "./components/spinner";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
   method: "GET",
   headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
   },
};

const App = () => {
   const [searchTerm, setSearchTerm] = useState<string>("");
   const [movies, setMovies] = useState<any>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   const fetchMovies = async (query: string) => {
      try {
         const res = await fetch(
            query
               ? `${API_BASE_URL}/search/movie?query=${query}`
               : `${API_BASE_URL}/discover/movie`,
            API_OPTIONS
         );
         const data = await res.json();
         setMovies(data.results);
      } catch (error) {
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchMovies(searchTerm);
   }, [searchTerm]);

   return (
      <>
         <div className="pattern"></div>

         <div className="wrapper">
            <header>
               <img src="../public/hero.png" alt="hero" />
               <h1>
                  Find{" "}
                  <span className="bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] bg-clip-text text-transparent">
                     Movies
                  </span>{" "}
                  You'll Enjoy without The Hassle
               </h1>
               <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>

            <section className="all-movies">
               <h2 className="mt-[40px]">All Movies</h2>

               {isLoading ? (
                  <Spinner />
               ) : (
                  <ul>
                     {movies.map((movie: any) => (
                        <MovieCard key={movie.id} movie={movie} />
                     ))}
                  </ul>
               )}
            </section>
         </div>
      </>
   );
};

export default App;

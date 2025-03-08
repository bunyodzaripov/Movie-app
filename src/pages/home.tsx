import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faChevronLeft,
   faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import service from "../service";
import { Carousel, MovieCard, Spinner, Search } from "../components";

const Index = () => {
   const [searchTerm, setSearchTerm] = useState<string>("");
   const [movies, setMovies] = useState<any>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [totalPages, setTotalPages] = useState<number>(0);

   const fetchMovies = async (query?: string, page: number = 1) => {
      setIsLoading(true);
      try {
         const endpoint = query
            ? `/search/movie?query=${query}&page=${page}`
            : `/discover/movie?sort_by=popularity.desc&page=${page}`;

         const res = await service.get(endpoint);
         setMovies(res.data.results);
         setTotalPages(res.data.total_pages);
      } catch (error) {
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchMovies(searchTerm, currentPage);
   }, [searchTerm, currentPage]);

   const nextPage = () => setCurrentPage((prev) => prev + 1);
   const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

   return (
      <>
         <div className="bg-hero-pattern inset-0 bg-center bg-cover absolute z-0"></div>

         <div className=" max-w-7xl mx-auto px-5 py-12 flex flex-col relative z-10 xs:p-10 ">
            <header>
               <img src="/hero.png" alt="hero" />
               <h1>
                  Find{" "}
                  <span className="bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] bg-clip-text text-transparent">
                     Movies
                  </span>{" "}
                  You'll Enjoy without The Hassle
               </h1>
               <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>

            <Carousel />

            <section className="space-y-9">
               <h2 className="mt-[40px]">All Movies</h2>

               {isLoading ? (
                  <Spinner />
               ) : (
                  <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                     {movies.map((movie: any) => (
                        <MovieCard key={movie.id} movie={movie} />
                     ))}
                  </ul>
               )}
            </section>

            <div className="flex justify-between mt-10 space-x-4">
               <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all ${
                     currentPage === 1
                        ? "bg-gray-800 cursor-not-allowed opacity-50"
                        : "bg-gray-800 cursor-pointer"
                  }`}
               >
                  <FontAwesomeIcon icon={faChevronLeft} />
               </button>

               <span className="text-lg font-semibold text-white bg-gray-800 px-4 py-2 rounded-lg">
                  {currentPage}/{totalPages}
               </span>
               <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gray-800 transition-all 
${
   currentPage === totalPages
      ? "cursor-not-allowed opacity-50"
      : "cursor-pointer "
}`}
               >
                  <FontAwesomeIcon icon={faChevronRight} />
               </button>
            </div>
         </div>
      </>
   );
};

export default Index;

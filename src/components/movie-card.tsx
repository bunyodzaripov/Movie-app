import { Link } from "react-router-dom";

const Index = ({
   movie: {
      title,
      poster_path,
      vote_average,
      release_date,
      original_language,
      id,
   },
}: any) => {
   return (
      <Link
         to={`/movie/${id}`}
         className="block hover:scale-102 transition-transform"
      >
         <div className="bg-dark-100 p-5 rounded-2xl shadow-inner shadow-light-100/10 flex flex-col h-full min-w-[180px]">
            <div className="w-full">
               <img
                  className="w-full h-72 sm:h-80 rounded-lg object-cover aspect-[2/3]"
                  src={
                     poster_path
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : "/no-movie.png"
                  }
                  alt={title}
               />
            </div>

            <div className="mt-4 flex flex-col flex-grow">
               <h3 className="text-white font-bold text-base line-clamp-1">
                  {title}
               </h3>

               <div className="mt-2 flex flex-row items-center flex-wrap gap-2">
                  <div className="flex flex-row items-center gap-1">
                     <img
                        className="size-4 object-contain"
                        src="/star.svg"
                        alt="star"
                     />
                     <p className="font-bold text-base text-white">
                        {vote_average ? vote_average.toFixed(1) : "N/A"}
                     </p>
                  </div>

                  <span className="text-sm text-gray-100">•</span>
                  <p className="capitalize text-gray-100 font-medium text-base">
                     {original_language ? original_language : "N/A"}
                  </p>

                  <span className="text-sm text-gray-100">•</span>
                  <p className="text-gray-100 font-medium text-base">
                     {release_date ? release_date.split("-")[0] : "N/A"}
                  </p>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default Index;

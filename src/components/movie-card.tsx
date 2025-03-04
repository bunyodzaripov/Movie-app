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
         className="block hover:scale-105 transition-transform"
      >
         <div className="movie-card">
            <img
               src={
                  poster_path
                     ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                     : "/no-movie.png"
               }
               alt={title}
            />
            <div className="mt-4">
               <h3>{title}</h3>

               <div className="content">
                  <div className="rating">
                     <img src="/star.svg" alt="star" />
                     <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                  </div>

                  <span>•</span>
                  <p className="lang">
                     {original_language ? original_language : "N/A"}
                  </p>

                  <span>•</span>
                  <p className="year">
                     {release_date ? release_date.split("-")[0] : "N/A"}
                  </p>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default Index;

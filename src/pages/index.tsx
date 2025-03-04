import loadable from "@loadable/component";
import { Spinner } from "../components";

const Home = loadable(() => import("./home"), {
   fallback: (
      <div className="flex justify-center items-center h-screen">
         <Spinner />
      </div>
   ),
});
const MovieDetails = loadable(() => import("./movie-details"), {
   fallback: (
      <div className="flex justify-center items-center h-screen">
         <Spinner />
      </div>
   ),
});
const NotFound = loadable(() => import("./not-found"), {
   fallback: (
      <div className="flex justify-center items-center h-screen">
         <Spinner />
      </div>
   ),
});

export { Home, MovieDetails, NotFound };

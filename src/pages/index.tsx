import { lazy, Suspense } from "react";
import { Spinner } from "../components";

const Home = lazy(() => import("./home"));
const MovieDetails = lazy(() => import("./movie-details"));
const NotFound = lazy(() => import("./not-found"));

const withSuspense = (Component: React.FC) => (props: any) =>
   (
      <Suspense
         fallback={
            <div className="flex justify-center items-center h-screen">
               <Spinner />
            </div>
         }
      >
         <Component {...props} />
      </Suspense>
   );

export const LazyHome = withSuspense(Home);
export const LazyMovieDetails = withSuspense(MovieDetails);
export const LazyNotFound = withSuspense(NotFound);

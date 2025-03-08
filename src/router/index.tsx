import { Routes, Route } from "react-router-dom";
import { LazyHome, LazyMovieDetails, LazyNotFound } from "../pages";

const Index = () => {
   return (
      <Routes>
         <Route path="/" element={<LazyHome />} />
         <Route path="/movie/:id" element={<LazyMovieDetails />} />
         <Route path="*" element={<LazyNotFound />} />
      </Routes>
   );
};

export default Index;

import { Routes, Route } from "react-router-dom";
import { Home, MovieDetails, NotFound } from "../pages";

const Index = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/movie/:id" element={<MovieDetails />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};

export default Index;

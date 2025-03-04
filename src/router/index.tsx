import { Routes, Route } from "react-router-dom";
import { Home, MovieDetails } from "../pages";

const Index = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
   );
};

export default Index;

import { useState } from "react";
import Search from "./components/search";

const App = () => {
   const [searchTerm, setSearchTerm] = useState<string>("");
   return (
      <>
         <div className="pattern"></div>

         <div className="wrapper">
            <header>
               <h1>
                  <img src="../public/hero.png" alt="hero" />
                  Find <span className="text-gradient">Movies</span> You'll
                  Enjoy without The Hassle
               </h1>
               <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
               <p className="text-white">{searchTerm}</p>
            </header>
         </div>
      </>
   );
};

export default App;

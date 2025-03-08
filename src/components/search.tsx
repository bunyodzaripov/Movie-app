interface IndexProps {
   searchTerm: string;
   setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Index = ({ searchTerm, setSearchTerm }: IndexProps) => {
   return (
      <div className="w-full bg-light-100/5 px-4 py-3 rounded-lg mt-10 max-w-3xl mx-auto">
         <div className="relative flex items-center">
            <img
               className="absolute left-2 h-5 w-5"
               src="/search.svg"
               alt="search"
            />
            <input
               className="w-full bg-transparent py-1 sm:pr-10 pl-10 text-base text-gray-200 placeholder-light-200 outline-hidden"
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Search Movies..."
            />
         </div>
      </div>
   );
};

export default Index;

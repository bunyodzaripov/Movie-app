interface IndexProps {
   searchTerm: string;
   setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Index = ({ searchTerm, setSearchTerm }: IndexProps) => {
   return (
      <div className="search">
         <div>
            <img src="/search.svg" alt="search" />
            <input
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

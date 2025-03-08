import { motion } from "framer-motion";

const Index = () => {
   return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
         <motion.div
            className="w-16 h-16 border-4 border-dashed border-[#6366F1] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
         />
         <motion.p
            className="mt-4 text-lg font-semibold text-[#A8B5DB]"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
         >
            Loading movie data...
         </motion.p>
      </div>
   );
};

export default Index;

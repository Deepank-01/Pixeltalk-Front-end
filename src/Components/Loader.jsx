import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners"; // Optional: Pre-built spinner

import Hourglass from  "../../public/Hourglass.gif"
import { motion } from "framer-motion";
import { BotMessageSquare, LoaderPinwheel, MessageCircle } from "lucide-react";
const Loader = () => {
    return (
        
        <div className="w-[100vw] h-[100vh] flex-col gap-5 md:gap-36 bg-[#121C22] flex items-center justify-center ">
        <BotMessageSquare
            className=" animate-bounce size-48"
        />
        <motion.p
            initial={{ y: -100, opacity: 0 }} // Initial position (off-screen)
           animate={{ y: 0, opacity: 1 }} // Animate to visible position
    transition={{ duration: 0.5, ease: "easeOut" }} // Animation duration and easing
         className=" md:text-xl  text-lg font-bold">Welcome To Pexel ... Chat </motion.p>
        </div>
     
    );
  };
  
export default Loader;
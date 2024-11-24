"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Slide1 from "@/components/slide1";
import Slide2 from "@/components/slide2";
import Slide3 from "@/components/slide3";
import Slide4 from "@/components/slide4";
import Slide5 from "@/components/slide5";
import Slide6 from "@/components/slide6";
import Slide7 from "@/components/slide7";

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define slides with names
  const slides = [
    { component: <Slide1 key="1" />, name: "Problem" },
    { component: <Slide2 key="2" />, name: "Solution" },
    { component: <Slide3 key="3" />, name: "Live Demo" },
    { component: <Slide4 key="4" />, name: "GTM strategy" },
    { component: <Slide5 key="5" />, name: "Conclusion" },
    { component: <Slide6 key="6" />, name: "Team" },
    { component: <Slide7 key="7" />, name: "Questions" },
  ];

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight" && currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
    if (event.key === "ArrowLeft" && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide]);

  return (
    <section className="flex flex-col w-full h-[80vh]">
      {/* Slide Container */}
      <div className="flex-grow w-full relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            animate={{ opacity: 1, x: 0 }}
            className="absolute w-full h-full"
            exit={{ opacity: 0, x: -100 }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            {slides[currentSlide].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Name Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        {slides.map((slide, index) => (
          <button
            key={index}
            className={`text-lg font-medium ${
              currentSlide === index ? "text-blue-500" : "text-gray-500"
            } hover:text-blue-400`}
            onClick={() => handleSelectSlide(index)}
          >
            {slide.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Home;

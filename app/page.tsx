"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Slide1 from "@/components/slide1";
import Slide2 from "@/components/slide2";
import Slide3 from "@/components/slide3";

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [<Slide1 key="1" />, <Slide2 key="2" />, <Slide3 key="3" />];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);
  };

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
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-4 py-4">
        <button className="btn" onClick={handlePrev}>
          Previous
        </button>
        <button className="btn" onClick={handleNext}>
          Next
        </button>
      </div>

      {/* Slide Number Buttons */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`btn px-3 py-2 rounded-md ${
              currentSlide === index
                ? "bg-green-300 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleSelectSlide(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Home;

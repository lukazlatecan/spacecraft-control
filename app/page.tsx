"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import Slide0 from "@/components/slide0";
import Slide1 from "@/components/slide1";
import Slide2 from "@/components/slide2";
import Slide3 from "@/components/slide3";
import Slide4 from "@/components/slide4";
import Slide5 from "@/components/slide5";
import Slide6 from "@/components/slide6";
import Slide7 from "@/components/slide7";

const Home: React.FC = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState<number | null>(null);

  // Define slides with names
  const slides = [
    { component: <Slide0 key="0" />, name: "SpaceGuardian" },
    { component: <Slide1 key="1" />, name: "Problem" },
    { component: <Slide2 key="2" />, name: "Solution" },
    { component: <Slide3 key="3" />, name: "Live Demo" },
    { component: <Slide4 key="4" />, name: "GTM strategy" },
    { component: <Slide5 key="5" />, name: "Team" },
    { component: <Slide6 key="6" />, name: "Awards" },
    { component: <Slide7 key="7" />, name: "Q&A" },
  ];

  const getSlideIndexByName = (name: string) =>
    slides.findIndex((slide) => slide.name === name);

  const handleSelectSlide = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      router.push(`/?slide=${encodeURIComponent(slides[index].name)}`);
    },
    [router, slides],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowRight" &&
        currentSlide !== null &&
        currentSlide < slides.length - 1
      ) {
        handleSelectSlide(currentSlide + 1);
      }
      if (
        event.key === "ArrowLeft" &&
        currentSlide !== null &&
        currentSlide > 0
      ) {
        handleSelectSlide(currentSlide - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide, handleSelectSlide, slides.length]);

  useEffect(() => {
    // Read initial slide from the URL on component mount
    const urlParams = new URLSearchParams(window.location.search);
    const slideName = urlParams.get("slide");
    const initialSlide = slideName
      ? getSlideIndexByName(decodeURIComponent(slideName))
      : 0;

    setCurrentSlide(initialSlide);
  }, []);

  if (currentSlide === null) {
    // Render nothing or a loading spinner until currentSlide is initialized
    return null;
  }

  return (
    <section className="flex flex-col w-full h-[85vh]">
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

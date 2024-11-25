import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type TextItem = {
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  image?: string;
  type: "text";
};

type SlideItem = TextItem;

interface SlideProps {
  title: string;
  items: SlideItem[];
  callback?: () => void;
}

const Slide: React.FC<SlideProps> = ({ title, items, callback }) => {
  const [currentIndex, setCurrentIndex] = useState(-1); // Start with -1 to show only the title

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown" && currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    if (event.key === "ArrowUp" && currentIndex > -1) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (currentIndex === items.length - 1 && callback) {
      callback();
    }
  }, [currentIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  return (
    <motion.div
      className="relative flex flex-col m-10 items-center w-full h-full p-6"
      animate={{
        y: currentIndex < 0 ? "40%" : "0%", // Moves the container vertically
      }}
      initial={{ y: "40%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Slide Title */}
      <motion.h1
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>

      {/* Slide Content */}
      <div className="relative mt-10 flex w-full max-w-4xl items-start">
        {/* Text Section (Left Aligned) */}
        <ul className="w-1/2 space-y-8">
          {items.map(
            (item, index) =>
              item.type === "text" && (
                <motion.li
                  key={index}
                  animate={{
                    opacity: currentIndex >= index ? 1 : 0,
                    x: currentIndex >= index ? 0 : -50,
                  }}
                  className="flex items-center text-xl"
                  initial={{ opacity: 0, x: -50 }}
                  transition={{
                    duration: 0.5,
                    delay: currentIndex >= index ? 0.2 : 0,
                  }}
                >
                  <item.icon className="text-blue-500 mr-3 h-6 w-6" />
                  {item.text}
                </motion.li>
              )
          )}
        </ul>

        {/* Image Section (Right Aligned) */}
        <div className="w-1/2 flex justify-center items-center">
          {currentIndex >= 0 && items[currentIndex]?.image && (
            <motion.div
              key={items[currentIndex].image}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                alt="Relevant image"
                className="w-auto max-w-full max-h-full object-contain rounded-lg"
                height={1024}
                src={items[currentIndex].image}
                width={1024}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Slide;

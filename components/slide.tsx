import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import StarIcon from "@heroicons/react/24/solid/StarIcon";

type TextItem = {
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  image?: string;
  imageWidth?: number;
  type: "text";
};

type SlideItem = TextItem;

interface SlideProps {
  titleImage?: string;
  title: string;
  items: SlideItem[];
  checkIcons?: React.ReactNode;
  callback?: () => void;
}
const Slide: React.FC<SlideProps> = ({
  titleImage,
  title,
  items,
  callback,
  checkIcons = (
    <StarIcon className="text-blue-500 h-6 w-6 flex-shrink-0 mx-5" />
  ),
}) => {
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
      animate={{
        y: currentIndex < 0 ? "40%" : "0%", // Moves the container vertically
      }}
      className="relative flex flex-col m-10 items-center w-full h-full p-6"
      initial={{ y: "40%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {titleImage && (
          <Image
            alt="Inline"
            className="inline-block w-20 h-20"
            height={56}
            src={titleImage}
            width={56}
          />
        )}
        <h1 className="text-5xl font-bold">{title}</h1>
      </motion.div>

      {/* Slide Content */}
      <div className="relative mt-10 flex w-full max-w-6xl items-center">
        {/* Text Section (Left Aligned) */}
        <ul className="w-3/6 space-y-8 pr-6">
          {items.map(
            (item, index) =>
              item.type === "text" && (
                <motion.li
                  key={index}
                  animate={{
                    opacity: currentIndex >= index ? 1 : 0,
                    x: currentIndex >= index ? 0 : -50,
                  }}
                  className="flex items-center text-2xl"
                  initial={{ opacity: 0, x: -50 }}
                  transition={{
                    duration: 0.5,
                    delay: currentIndex >= index ? 0.2 : 0,
                  }}
                >
                  {checkIcons}
                  {item.text}
                </motion.li>
              ),
          )}
        </ul>

        {/* Image Section (Centered) */}
        <div className="w-3/6 flex justify-center items-center">
          <AnimatePresence>
            {currentIndex >= 0 && items[currentIndex]?.image && (
              <motion.div
                key={items[currentIndex].image}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center w-full h-full"
                exit={{ opacity: 0, transition: { duration: 0 } }} // Instant exit
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeIn" }} // Smooth enter
              >
                <Image
                  alt="Relevant image"
                  className="max-w-full max-h-full object-contain rounded-lg"
                  height={items[currentIndex].imageWidth || 512}
                  src={items[currentIndex].image}
                  width={items[currentIndex].imageWidth || 512}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Slide;

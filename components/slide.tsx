import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type TextItem = {
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  type: "text";
};

type ImageItem = {
  image: string; // Only one image is allowed
  type: "image";
};

type SlideItem = TextItem | ImageItem;

interface SlideProps {
  title: string;
  items: SlideItem[];
}

const Slide: React.FC<SlideProps> = ({ title, items }) => {
  const [currentIndex, setCurrentIndex] = useState(-1); // Start with -1 to show only the title
  const [bigImageVisible, setBigImageVisible] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown" && currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    if (event.key === "ArrowUp" && currentIndex > -1) {
      setCurrentIndex((prev) => prev - 1);
    }
    if (event.key === " " && bigImageVisible) {
      // Hide big image when Space is pressed
      setBigImageVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, bigImageVisible]);

  // Automatically toggle big image visibility when the current item is of type "image"
  useEffect(() => {
    if (currentIndex >= 0 && items[currentIndex]?.type === "image") {
      setBigImageVisible(true);
    }
  }, [currentIndex]);

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-full p-6">
      {/* Big Image with Transparent Blurred Background */}
      {bigImageVisible &&
        currentIndex >= 0 &&
        items[currentIndex]?.type === "image" && (
          <div className="absolute inset-0 flex justify-center items-center z-10 backdrop-blur-lg">
            <Image
              alt="Big image"
              className="w-auto max-w-full max-h-full object-contain rounded-lg"
              src={(items[currentIndex] as ImageItem).image}
              width={512}
              height={512}
            />
          </div>
        )}

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
      <div className="relative mt-6 w-full max-w-xl">
        <ul className="space-y-4">
          {items.map((item, index) => (
            <motion.li
              key={index}
              animate={{
                opacity: currentIndex >= index ? 1 : 0,
                x: currentIndex >= index ? 0 : 50,
              }}
              className="flex flex-col text-lg"
              initial={{ opacity: 0, x: 50 }}
              transition={{
                duration: 0.5,
                delay: currentIndex >= index ? 0.2 : 0,
              }}
            >
              {item.type === "text" ? (
                <div className="flex items-center">
                  <item.icon className="text-blue-500 mr-3 h-6 w-6" />
                  {item.text}
                </div>
              ) : item.type === "image" ? (
                <div className="flex justify-center">
                  <img
                    alt="Small image"
                    className="h-16 object-cover rounded-md"
                    src={item.image}
                  />
                </div>
              ) : null}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Slide;

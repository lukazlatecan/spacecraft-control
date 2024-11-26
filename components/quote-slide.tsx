import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface QuoteSlideProps {
  title: string;
  quote: string;
  quoteAuthor: string;
  companyNameText: string;
  slogan: string;
  image?: string;
}

const QuoteSlide: React.FC<QuoteSlideProps> = ({
  title,
  quote,
  quoteAuthor,
  companyNameText,
  slogan,
  image,
}) => {
  const [startSloganAnimation, setStartSloganAnimation] = useState(false);
  const [startLogoAnimation, setStartLogoAnimation] = useState(false);

  // Trigger slogan animation with down arrow key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setStartSloganAnimation(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Calculate the duration of the slogan animation
  const sloganAnimationDuration = slogan.length * 0.05; // 0.05s per letter

  // Trigger logo animation after slogan animation is complete
  useEffect(() => {
    if (startSloganAnimation) {
      const timer = setTimeout(() => {
        setStartLogoAnimation(true);
      }, sloganAnimationDuration * 1000); // Convert seconds to milliseconds

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [startSloganAnimation, sloganAnimationDuration]);

  // Variants for slogan animation (letter by letter)
  const sloganVariants = {
    hidden: { opacity: 0 },
    visible: (index: number) => ({
      opacity: 1,
      transition: {
        delay: index * 0.05, // Animate each letter with a slight delay
      },
    }),
  };

  // Variant for logo fade-in
  const logoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } }, // Slow fade-in
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">{title}</h1>

      {/* Quote */}
      <blockquote className="text-l italic text-center max-w-2xl mb-4">
        &quot;{quote}&quot;{" "}
        <span className="text-blue-500 font-bold text-xs">{quoteAuthor}</span>
      </blockquote>

      {/* Placeholder for slogan */}
      <div className="mt-20 h-12 flex items-center justify-center">
        {startSloganAnimation && (
          <motion.h1
            className="text-blue-500 font-bold text-3xl text-center"
            style={{ display: "inline-block" }}
            initial="hidden"
            animate="visible"
          >
            {slogan.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={sloganVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
        )}
      </div>

      {/* Placeholder for logo */}
      <div className="mt-5 h-16 flex items-center justify-center">
        {startLogoAnimation && (
          <motion.div
            className="flex items-center space-x-4"
            initial="hidden"
            animate="visible"
            variants={logoVariants}
          >
            {image && (
              <img
                src={image}
                alt="Inline Logo"
                className="inline-block h-10"
              />
            )}
            <h1 className="text-xl font-bold">{companyNameText}</h1>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuoteSlide;

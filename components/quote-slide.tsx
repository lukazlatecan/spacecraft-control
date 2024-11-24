import React from "react";

interface QuoteSlideProps {
  title: string;
  quote: string;
  quoteAuthor: string;
  companyName: string;
  slogan: string; // New prop for company slogan
}

const QuoteSlide: React.FC<QuoteSlideProps> = ({
  title,
  quote,
  quoteAuthor,
  companyName,
  slogan,
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">{title}</h1>

      {/* Quote */}
      <blockquote className="text-l italic text-center max-w-2xl mb-4">
        &quot;{quote}&quot;{" "}
        <span className="text-blue-500 font-bold text-xs">{quoteAuthor}</span>
      </blockquote>

      <h1 className="text-5xl text-center mb-2 mt-5">
        <span className="text-blue-500 font-bold">{companyName}</span>
      </h1>
      <h1 className="text-3xl text-center mb-2">{slogan}</h1>
    </div>
  );
};

export default QuoteSlide;

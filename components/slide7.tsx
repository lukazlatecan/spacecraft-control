import React from "react";

import QuoteSlide from "./quote-slide";

const Slide7: React.FC = () => {
  return (
    <QuoteSlide
      companyNameText="SpaceGuardian"
      image="/favicon.png"
      quote="There is an urgent need for proper space traffic management, with clear communication protocols and more automation"
      quoteAuthor="Holger Krag, Head of Space Safety at ESA"
      slogan="Guiding satellites towards autonomous tomorrow."
      title="Q&A"
    />
  );
};

export default Slide7;

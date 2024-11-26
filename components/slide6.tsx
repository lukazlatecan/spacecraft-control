import React from "react";

import QuoteSlide from "./quote-slide";

const Slide6: React.FC = () => {
  return (
    <QuoteSlide
      companyNameText="SpaceGuardian"
      quote="If we had asked satellite operators what they wanted, they would have said: Satellites with more fuel and less congestion in orbit."
      quoteAuthor="Henry Ford"
      slogan="Guiding satellites towards autonomous tomorrow."
      title="Q&A"
      image="/favicon.png"
    />
  );
};

export default Slide6;

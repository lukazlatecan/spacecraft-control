import React from "react";

import Slide from "./slide";

const Slide3: React.FC = () => {
  return (
    <Slide
      callback={() => {
        // Reroute to live demo
        setTimeout(() => {
          const pageUrl = window.location.href
            .split("/")
            .slice(0, -1)
            .join("/");

          window.location.href = `${pageUrl}/demo`;
        }, 1200);
      }}
      items={[]}
      title="Live Demo"
    />
  );
};

export default Slide3;

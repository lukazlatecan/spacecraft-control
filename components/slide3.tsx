import React from "react";

import Slide from "./slide";

const Slide3: React.FC = () => {
  return (
    <Slide
      items={[]}
      title="Live Demo"
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
    />
  );
};

export default Slide3;

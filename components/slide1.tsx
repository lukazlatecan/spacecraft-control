import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

import Slide from "./slide";

const Slide1: React.FC = () => {
  const items = [
    {
      text: "Orbits see 30+ satellites launched weekly - Kessler syndrome",
      icon: CheckCircleIcon,
      image: "/images/5.png",
      type: "text" as const,
      imageWidth: 400,
    },
    {
      text: "Tools like LeafSpace track collisions but rely on outdated responses.",
      image: "/images/4.png",
      icon: CheckCircleIcon,
      type: "text" as const,
      imageWidth: 400,
    },
    {
      text: "Slow, error-prone methods waste fuel and shorten satellite lifespans.",
      image: "/images/3.png",
      icon: CheckCircleIcon,
      type: "text" as const,
      imageWidth: 400,
    },
    {
      text: "Collisions add debris, worsening orbit management challenges.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/sat-collision.png",
      imageWidth: 300,
    },
  ];

  return (
    <Slide
      checkIcons={
        <XCircleIcon className="text-red-500 h-6 w-6 flex-shrink-0 mx-5" />
      }
      items={items}
      title="Problem"
    />
  );
};

export default Slide1;

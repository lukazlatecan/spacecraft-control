import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

import Slide from "./slide";

const Slide1: React.FC = () => {
  const items = [
    {
      text: "Low Earth orbit is growing busy with 30+ satellites launching weekly.",
      icon: CheckCircleIcon,
      image: "/images/5.png",
      type: "text" as const,
      imageWidth: 350,
    },
    {
      text: "Tools like LeafSpace and LeoSafe only monitor collisions.",
      image: "/images/4.png",
      icon: CheckCircleIcon,
      type: "text" as const,
      imageWidth: 350,
    },
    {
      text: "Manual maneuvers are slow, error-prone, and waste fuel.",
      image: "/images/3.png",
      icon: CheckCircleIcon,
      type: "text" as const,
      imageWidth: 350,
    },
    {
      text: "There are 39,340 tracked objects and 650+ fragmentation events.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/sat-collision.png",
      imageWidth: 300,
    },
    {
      text: "Automated space traffic management is urgently needed.",
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

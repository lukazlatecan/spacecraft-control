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
      text: "The 2009 collision between the Iridium 33 and Cosmos 2251 satellites.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/sat-collision.png",
      imageWidth: 300,
    },
    {
      text: "SpaceX Starlink satellites performed 50,000 collision-avoidance maneuvers in the past six months alone.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/spacex.png",
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

import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import Slide from "./slide";

const Slide1: React.FC = () => {
  const items = [
    {
      image: "/images/5.png",
      type: "image" as const,
    },
    {
      text: "Orbits see 30+ satellites launched weekly - Kessler syndrome",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
    {
      image: "/images/4.png",
      type: "image" as const,
    },
    {
      text: "Tools like LeafSpace track collisions but rely on outdated responses.",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
    {
      image: "/images/3.png",
      type: "image" as const,
    },
    {
      text: "Slow, error-prone methods waste fuel and shorten satellite lifespans.",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
    {
      text: "Collisions add debris, worsening orbit management challenges.",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
  ];

  return <Slide items={items} title="Problem" />;
};

export default Slide1;

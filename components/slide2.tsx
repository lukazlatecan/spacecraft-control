import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import Slide from "./slide";

const Slide2: React.FC = () => {
  const items = [
    {
      text: "A ground based subscription SaaS platform for automatic satellite collision prevention and maneuver optimization.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/logo.png",
      imageWidth: 200,
    },
    {
      text: "It predicts, calculates, and executes satellite maneuvers.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/algorithm.png",
      imageWidth: 350,
    },
    {
      text: "The system optimizes fuel use and collision avoidance.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/trajectory-satellite.png",
      imageWidth: 400,
    },
    {
      text: "It uses an auction process for maneuver decisions.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/risk.png",
      imageWidth: 400,
    }
  ];

  return <Slide items={items} title="Solution" />;
};

export default Slide2;

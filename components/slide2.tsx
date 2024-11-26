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
      text: "It monitors trajectories and uses predictive algorithms for proactive collision prevention.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/algorithm.png",
      imageWidth: 350,
    },
    {
      text: "Automatically calculates, simulates, and executes optimal maneuvers to maintain the satellite's safe trajectory.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/trajectory-satellite.png",
      imageWidth: 400,
    },
    {
      text: "Maneuvers with long-term considerations like fuel consumption, collision risks, and operational efficiency.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/risk.png",
      imageWidth: 400,
    },
  ];

  return <Slide items={items} title="Solution" />;
};

export default Slide2;

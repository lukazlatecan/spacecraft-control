import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import Slide from "./slide";
import { image } from "@nextui-org/theme";

const Slide2: React.FC = () => {
  const items = [
    {
      text: "SpaceGuardian - a ground based subscription SaaS platform for automatic satellite collision prevention and maneuver optimization.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/logo.png",
    },
    {
      text: "It monitors trajectories and uses predictive algorithms for proactive prevention.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/trajectory-satellite.png",
    },
    {
      text: "Detected risks trigger calculated, simulated, and executed safe maneuvers.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/dodging-debris.png",
    },
    {
      text: "Maneuvers optimize fuel, reduce risks, and enhance efficiency.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/reduce-risk.png",
    },
  ];

  return <Slide items={items} title="Solution" />;
};

export default Slide2;

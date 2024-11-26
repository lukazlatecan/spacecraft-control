import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import Slide from "./slide";

const Slide4: React.FC = () => {
  const items = [
    {
      text: "Focus on commercial satellite operators to reduce costs.",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
    {
      text: "Partner with insurers for bundled packages.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/insurance.png",
      imageWidth: 400,
    },
    {
      text: "Partner with companies like SkyLabs or ACC Clyde Space for communication infrastructure.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/skylabs-aac-clyde.png",
      imageWidth: 300,
    },
    {
      text: "Collaborate with ESA to standardize conjunction responses.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/esa-bright.png",
      imageWidth: 350,
    },
    {
      text: "Our strategy is adaptable to the growing VLEO market.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/vleo.png",
      imageWidth: 300,
    },
    {
      text: "Tap into the $35 billion satellite market with collision avoidance.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/market.png",
      imageWidth: 400,
    },
  ];

  return <Slide items={items} title="GTM strategy" />;
};

export default Slide4;
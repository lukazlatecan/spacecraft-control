import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import Slide from "./slide";

const Slide4: React.FC = () => {
  const items = [
    {
      text: "The LEO market was USD 12.4B in 2024 and will hit USD 27.8B by 2030. Our focus is on operators with 5–50 satellites.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/money.png",
      imageWidth: 200,
    },
    {
      text: "Partner with insurance companies to bundle collision prevention",
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
      text: "A scalable subscription model starts at EUR 20K–30K yearly.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/market.png",
      imageWidth: 400,
    }
  ];

  return <Slide items={items} title="GTM strategy" />;
};

export default Slide4;
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import Slide from "./slide";

const Slide4: React.FC = () => {
  const items = [
    {
      text: "Targeting operators seeking efficiency and cost savings.",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
    {
      text: "Partnering with insurers to bundle collision prevention and insurance.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/insurance.png",
      imageWidth: 400,
    },
    {
      text: "Connect with satellite on board companies like SkyLabs or AAC Clyde Space.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/skylabs-aac-clyde.png",
      imageWidth: 300,
    },
    {
      text: "Planning to standardize responses via ESA collaborations.",
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
      text: "Targets the $35B+ satellite market by 2030 with flexible, competitive pricing.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/market.png",
      imageWidth: 400,
    },
  ];

  return <Slide items={items} title="GTM strategy" />;
};

export default Slide4;

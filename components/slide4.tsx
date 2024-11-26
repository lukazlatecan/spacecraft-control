import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import Slide from "./slide";
import { image } from "@nextui-org/theme";

const Slide4: React.FC = () => {
  const items = [
    {
      text: "Targeting commercial operators focused on efficiency and longevity to provide them cost reduction.",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
    {
      text: "Partnering with insurers to bundle collision prevention and insurance.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/insurance.png",
    },
    {
      text: "Connect with satellite on board companies like SkyLabs or AAC Clyde Space.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/skylabs-aac-clyde.png",
    },
    {
      text: "Planning to standardize responses via ESA collaborations.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/esa-bright.png",
    },
    {
      text: "Our strategy is adaptable to the growing VLEO market.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/vleo.png",
    },
  ];

  return <Slide items={items} title="GTM strategy" />;
};

export default Slide4;

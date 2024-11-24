import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import Slide from "./slide";

const Slide4: React.FC = () => {
  const items = [
    {
      text: "Targeting commercial operators focused on efficiency and longevity.",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
    {
      text: "Partnering with insurers to bundle collision prevention and insurance.",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
    {
      text: "Planning to standardize responses via ESA collaborations.",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
    {
      text: "Engaging in tenders to shape conjunction response processes.",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
  ];

  return <Slide items={items} title="GTM strategy" />;
};

export default Slide4;

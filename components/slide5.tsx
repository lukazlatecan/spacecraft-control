import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import Slide from "./slide";

const Slide5: React.FC = () => {
  const items = [
    {
      text: "Extend satellite lifespans with optimized automation.",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
    {
      text: "Reduce reliance on human controllers for monitoring.",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
    {
      text: "Minimize debris to keep orbits clear.",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
    {
      text: "Promote standardized, safer conjunction responses.",
      icon: CheckCircleIcon,
      type: "text" as const,
    },
  ];

  return <Slide items={items} title="Conclusion" />;
};

export default Slide5;

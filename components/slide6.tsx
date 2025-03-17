import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import Slide from "./slide";

const Slide6: React.FC = () => {
  const items = [
    {
      text: "We won first prize at the Cassini Hackathon 2024.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/cassini.png",
      imageWidth: 400,
    },
    {
      text: "We earned third place at the We Make Future event in Bologna.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/wmf.png",
      imageWidth: 400,
    },
    {
      text: "Multiple hackathon wins back our technical skills.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/dragonhack.png",
      imageWidth: 300,
    },
    {
      text: "These awards confirm our solution’s innovation.",
      icon: CheckCircleIcon,
      type: "text" as const,
      image: "/images/innovation.png",
      imageWidth: 350,
    }
  ];

  return <Slide items={items} title="Awards & Recognitions" />;
};

export default Slide6;
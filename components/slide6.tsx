import React from "react";
import TeamSlide from "./team-slide";

const Slide6: React.FC = () => {
  const teamMembers = [
    {
      image: "/images/nejc.png",
      name: "Jernej Jan Kočica",
      position: "PhD candidate",
    },
    {
      image: "/images/luka.png",
      name: "Luka Zlatečan",
      position: "CTO@IndigoLabs",
    },
    {
      image: "/images/janez.png",
      name: "Janez Lapajne",
      position: "PhD candidate",
    },
  ];

  return <TeamSlide title="Meet Our Team" teamMembers={teamMembers} />;
};

export default Slide6;

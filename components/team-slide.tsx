import React from "react";

interface TeamMember {
  image: string;
  name: string;
  position: string;
}

interface TeamSlideProps {
  title: string; // Slide title
  teamMembers: TeamMember[]; // Array of team members
}

const TeamSlide: React.FC<TeamSlideProps> = ({ title, teamMembers }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">{title}</h1>

      {/* Team Members */}
      <div className="flex justify-center items-center flex-wrap gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 border rounded-lg shadow-md w-64"
          >
            {/* Member Image */}
            <img
              alt={member.name}
              className="w-56 h-56 mb-4 object-cover"
              src={member.image}
            />
            {/* Member Name */}
            <h2 className="text-lg font-bold">{member.name}</h2>
            {/* Member Position */}
            <p className="text-sm text-gray-500">{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSlide;

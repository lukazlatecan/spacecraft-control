import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

interface CDMInfoCardProps {
  encounterStage: "initial" | "worsening" | "resolved" | null;
  encounterDetails: {
    TCA: string;
    probabilityOfCollision: number;
    relativeSpeed: number;
  };
  currentSatelliteName: string | undefined;
  satellitesOfSecondaryInterest: string[];
  missDistance: number;
}

const CDMInfoCard: React.FC<CDMInfoCardProps> = ({
  encounterStage,
  encounterDetails,
  currentSatelliteName,
  satellitesOfSecondaryInterest,
  missDistance,
}) => {
  if (!encounterDetails) {
    return null;
  }

  // Map encounterStage to specific Tailwind classes
  const colorClasses = {
    initial: {
      bg: "bg-blue-100",
      border: "border-blue-400",
      text: "text-blue-700",
      icon: "text-blue-500",
    },
    worsening: {
      bg: "bg-orange-100",
      border: "border-orange-400",
      text: "text-orange-700",
      icon: "text-orange-500",
    },
    resolved: {
      bg: "bg-green-100",
      border: "border-green-400",
      text: "text-green-700",
      icon: "text-green-500",
    },
  };

  const classes = colorClasses[encounterStage || "initial"];
  const className = `${classes.bg} ${classes.border} ${classes.text} px-4 py-3 rounded relative shadow`;

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        <InformationCircleIcon className={`h-8 w-8 ${classes.icon}`} />
        <span className="font-bold text-2xl">
          {encounterStage === "worsening"
            ? "Collision Risk"
            : encounterStage === "resolved"
              ? "Situation Resolved"
              : "Collision Avoided"}
        </span>
      </div>
      {encounterStage === "resolved" ? (
        <p className="text-lg">
          The situation has been resolved. No further action is required.
        </p>
      ) : (
        <>
          <p className="mb-1 text-lg">
            Potential collision between{" "}
            <span className="font-bold">{currentSatelliteName}</span> and{" "}
            <span className="font-bold">
              {satellitesOfSecondaryInterest[0]}
            </span>
            {encounterStage === "initial" ? " has been avoided." : "."}
          </p>
          {encounterStage !== "initial" && (
            <ul className="list-disc list-inside pl-4 space-y-1 text-sm">
              <li>
                <span className="font-semibold">TCA:</span>{" "}
                {encounterDetails.TCA}
              </li>
              <li>
                <span className="font-semibold">Collision Probability:</span>{" "}
                {encounterDetails.probabilityOfCollision}
              </li>
              <li>
                <span className="font-semibold">Relative Speed:</span>{" "}
                {encounterDetails.relativeSpeed} m/s
              </li>
              <li>
                <span className="font-semibold">Miss Distance:</span>{" "}
                {missDistance} meters
              </li>
            </ul>
          )}
          {encounterStage === "initial" && (
            <>
              <p className="mb-3 text-sm">
                Automatic orbit adjustment performed to avoid collision.
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1 text-xs">
                <li>
                  <span className="font-semibold">Object Type:</span> Space
                  Debris
                </li>
                <li>
                  <span className="font-semibold">Adjustment Time:</span>{" "}
                  {encounterDetails.TCA}
                </li>
                <li>
                  <span className="font-semibold">Delta-V Applied:</span> 0.5
                  m/s
                </li>
                <li>
                  <span className="font-semibold">New Orbit Altitude:</span>{" "}
                  1801 km
                </li>
              </ul>
              <p className="mt-3 text-sm font-semibold">
                No further action is required at this time.
              </p>
            </>
          )}

          {encounterStage === "worsening" && (
            <p className="mt-3 text-lg font-semibold">
              Immediate action is required to mitigate the increased collision
              risk.
            </p>
          )}
          {encounterStage === "initial" && (
            <p className="mt-3 text-sm">
              Current trajectory shows no immediate threat.{" "}
              <span className="font-semibold">No action</span> is required at
              this time.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CDMInfoCard;

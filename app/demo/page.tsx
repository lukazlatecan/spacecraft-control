"use client";

import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  CheckCircleIcon,
  CogIcon,
  ClockIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

import {
  Action,
  fetchAndFilterSatelliteTLEs,
  Satellite,
  Step,
} from "@/utils/fetchSatellites";
import ThreeEarth from "@/components/ThreeEarth";
import dynamic from "next/dynamic";
import CDMInfoCard from "@/components/CDMInfo";
import { text } from "stream/consumers";

// Dynamically import the EncounterGraph component with no SSR
const EncounterGraph = dynamic(() => import("@/components/EncounterGraph"), {
  ssr: false,
});
const TCA_DISTANCE1 = 9012;
const TCA_DISTANCE2 = 2990;
const DemoPage: React.FC = () => {
  const [satellites, setSatellites] = useState<Satellite[]>();
  const [allSatellites, setAllSatellites] = useState<Satellite[]>();
  const [selectedSatellite, setSelectedSatellite] = useState<number>(1);
  const [selectedSatelliteIdx, setSelectedSatelliteIdx] = useState<number>(1);
  const [highestBid, setHighestBid] = useState<number>(0);
  const [userBid, setUserBid] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [triggerZoom, setTriggerZoom] = useState<boolean>(false);
  const [satellitesOfSecondaryInterest, setSatellitesOfSecondaryInterest] =
    useState<string[]>([]);
  const [encounterDetails, setEncounterDetails] = useState<{
    TCA: string;
    probabilityOfCollision: number;
    relativeSpeed: number;
  } | null>(null);
  const [biddingInProgress, setBiddingInProgress] = useState<boolean>(false);
  const [bidSubmitted, setBidSubmitted] = useState<boolean>(false);
  const [encounterStage, setEncounterStage] = useState<
    "initial" | "worsening" | "resolved" | null
  >(null);
  const [missDistance, setMissDistance] = useState<number>(9000);

  const [timeRange, setTimeRange] = useState<number[]>([]);
  const [distanceValues, setDistanceValues] = useState<number[]>([]);

  useEffect(() => {
    const generateGraphData = () => {
      const relativeSpeed = (7 * 1000) / 60; // Relative speed in m/s (7 km/min)
      const timeBeforeTCA = 120; // Simulate 2 minutes before and after TCA (in seconds)

      const tcaDistance = missDistance; // Closest distance at TCA (in meters)
      const initialDistance = relativeSpeed * timeBeforeTCA; // Initial distance (in meters)
      // Generate the time range (seconds relative to TCA)
      const generatedTimeRange = Array.from({ length: 300 }, (_, i) =>
        Math.round(i * (timeBeforeTCA / 150) - timeBeforeTCA)
      );

      // Calculate the coefficient 'a' for the parabola formula: distance = a * t^2 + tcaDistance
      const a = (initialDistance - tcaDistance) / Math.pow(timeBeforeTCA, 2);

      // Generate the parabolic distance values
      const generatedDistanceValues = generatedTimeRange.map((time) => {
        const baseDistance = a * Math.pow(time, 2) + tcaDistance;
        const variance = Math.random() * 50 - 25; // Variance ±25 meters
        return baseDistance + variance;
      });

      setTimeRange(generatedTimeRange);
      setDistanceValues(generatedDistanceValues);
    };

    generateGraphData();
  }, [missDistance]);

  const currentSatellite = satellites?.find(
    (sat) => sat.id === selectedSatellite
  );

  useEffect(() => {
    const loadSatellites = async () => {
      try {
        const data = await fetchAndFilterSatelliteTLEs();
        const newSatellites = data.slice(0, 200);
        setAllSatellites(newSatellites);
        const firstSatellites = newSatellites.slice(0, 2);
        firstSatellites.push(newSatellites[2]);
        setSatellites(firstSatellites);
        setSelectedSatellite(firstSatellites[0].id);
        setSelectedSatelliteIdx(0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadSatellites();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "1") handleCDMWarning();
      if (event.key === "2") handleAction2();
      if (event.key === "0") {
        window.location.href = "/?slide=GTM%20strategy";
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentSatellite, allSatellites, encounterStage]);

  const addAction = (title: string, steps: Step[]): void => {
    if (!currentSatellite) return;

    const newAction: Action = {
      id: currentSatellite.actions.length + 1,
      title,
      steps,
      status: "pending",
    };

    setSatellites((prev) =>
      prev?.map((sat) =>
        sat.id === selectedSatellite
          ? { ...sat, actions: [...sat.actions, newAction] }
          : sat
      )
    );
  };

  const handleCDMWarning = (): void => {
    if (!currentSatellite || !allSatellites) return;

    setEncounterStage("initial");
    setMissDistance(TCA_DISTANCE1);

    const satellite1 = allSatellites[3 + selectedSatelliteIdx * 3]?.name;
    const secondaryInterestSatellites = [satellite1];

    setSatellitesOfSecondaryInterest(secondaryInterestSatellites);

    const predictedTimeUTC = "14:32 UTC"; // Example time of closest approach
    const predictedDate = "2024-12-01"; // Example date
    const probabilityOfCollision = 0.000001; // Probability of collision
    const relativeSpeed = 7.8; // Relative speed in km/s
    const details = {
      TCA: predictedTimeUTC + " on " + predictedDate,
      probabilityOfCollision,
      relativeSpeed,
    };
    setEncounterDetails(details);

    const steps: Step[] = [
      {
        name: "CDM Warming - Close Encounter Detected",
        textDescription: `A close encounter has been detected with ${satellite1}. The trajectory of ${currentSatellite.name} has been adjusted to avoid a potential collision.`,
        description: details,
        status: "done",
      },
    ];

    addAction(`CDM Warning - Auto avoidance`, steps);
  };

  const handleAction2 = (): void => {
    if (!currentSatellite) return;
    if (!allSatellites) return;
    setTimeout(() => {
      setHighestBid(1200);
    }, 2000);
    if (encounterStage === "initial") {
      const secondaryInterestSatellites = [
        allSatellites[4 + selectedSatelliteIdx * 3]?.name,
      ];
      setSatellitesOfSecondaryInterest(secondaryInterestSatellites);

      // Situation has worsened
      setEncounterStage("worsening");
      setMissDistance(TCA_DISTANCE2);

      const details = {
        TCA: "11:22 UTC" + " on " + "2024-11-29",
        probabilityOfCollision: 1.0e-5,
        relativeSpeed: 7.8,
      };
      setEncounterDetails(details);

      const steps: Step[] = [
        {
          name: "Close Encounter Detected",
          description: details,
          textDescription: `A close encounter has been detected with ${secondaryInterestSatellites[0]}. Bid to avoid a potential collision.`,
          status: "pending",
        },
      ];
      setBiddingInProgress(true);
      addAction(`CDM Alert - Bidding initiated`, steps);
    } else if (encounterStage === "worsening") {
      // Start the bidding process
      const steps: Step[] = [
        {
          name: "Bidding Started",
          description: "Bidding process has started.",
          textDescription: "Bidding process has started.",
          status: "processing",
        },
      ];

      addAction(
        `Action ${currentSatellite?.actions.length + 1}: Bidding Action`,
        steps
      );

      // setBiddingInProgress(true);
    }
  };

  const renderStatusIcon = (status: "pending" | "processing" | "done") => {
    switch (status) {
      case "pending":
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
      case "processing":
        return <CogIcon className="h-5 w-5 text-yellow-500 animate-spin" />;
      case "done":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    }
  };

  const handleBidSubmit = () => {
    if (!userBid) return;
    setHighestBid(userBid);

    if (!currentSatellite) return;

    // setSatellites((prev: any) => {
    //   return prev?.map((sat: any) => {
    //     if (sat.id === selectedSatellite) {
    //       const updatedActions = sat.actions.map((action: any) => {
    //         if (action.title.includes("Bidding Action")) {
    //           const updatedSteps = action.steps.map((step: any) => {
    //             if (step.name === "Bidding Started") {
    //               return { ...step, status: "done" };
    //             }
    //             return step;
    //           });
    //           // Add a new step to indicate that the user won the bid
    //           updatedSteps.push({
    //             name: "Bid Submitted",
    //             description: `User bid $${userBid} and is now the highest bidder.`,
    //             status: "done",
    //           });
    //           return { ...action, steps: updatedSteps, status: "done" };
    //         }
    //         return action;
    //       });
    //       return { ...sat, actions: updatedActions };
    //     }
    //     return sat;
    //   });
    // });

    setBidSubmitted(true);
  };

  const handleAcceptBid = () => {
    if (!currentSatellite) return;

    setEncounterStage("resolved");
    setMissDistance(12000);

    setTimeout(() => {
      setTriggerZoom(true);
    }, 1000);

    // setSatellites((prev: any) => {
    //   return prev?.map((sat: any) => {
    //     if (sat.id === selectedSatellite) {
    //       const updatedActions = sat.actions.map((action: any) => {
    //         if (action.title.includes("Bidding Action")) {
    //           const updatedSteps = [...action.steps];
    //           updatedSteps.push({
    //             name: "Bid Accepted",
    //             description: `The bid has been accepted. Situation resolved.`,
    //             status: "done",
    //           });
    //           return { ...action, steps: updatedSteps, status: "done" };
    //         }
    //         return action;
    //       });
    //       return { ...sat, actions: updatedActions };
    //     }
    //     return sat;
    //   });
    // });
    // Update actions

    setBiddingInProgress(false);
    setBidSubmitted(false);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 md:py-10">
      {/* 3D Earth Visualization */}
      <div className="col-span-2 justify-center items-center">
        {loading && <p className="text-gray-500">Loading satellites...</p>}
        {!loading && allSatellites !== undefined && (
          <ThreeEarth
            ofInterestColor="#ff0000"
            ofSecondaryInterestColor="#ffa500"
            satellites={allSatellites}
            satellitesOfInterest={[currentSatellite?.name || "NO SATELLITE"]}
            satellitesOfSecondaryInterest={satellitesOfSecondaryInterest}
            triggerManeuver={triggerZoom}
            triggerZoom={triggerZoom}
          />
        )}
      </div>

      {/* CDM Details and Bidding Section */}
      <div className="col-span-1 flex flex-col gap-4">
        <div className="flex justify-center gap-4">
          {!satellites && <p>No satellites found.</p>}
          {satellites &&
            satellites.length !== 0 &&
            satellites.map((satellite) => (
              <button
                key={satellite.id}
                className={`px-4 py-2 rounded shadow ${
                  selectedSatellite === satellite.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setSelectedSatellite(satellite.id)}
              >
                {satellite.name}
              </button>
            ))}
        </div>
        <h1 className="text-2xl font-bold text-center">
          Actions for {currentSatellite?.name || "No Satellite"}
        </h1>

        {/* Info Card for CDM Warning */}
        {encounterDetails ? (
          <CDMInfoCard
            encounterStage={encounterStage}
            encounterDetails={encounterDetails}
            currentSatelliteName={currentSatellite?.name}
            satellitesOfSecondaryInterest={satellitesOfSecondaryInterest}
            missDistance={missDistance}
          />
        ) : (
          <p className="text-gray-500">No active alerts.</p>
        )}

        {/* Bidding Section */}
        {biddingInProgress && encounterStage == "worsening" && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative shadow">
            <div className="flex items-center gap-2 mb-4">
              <InformationCircleIcon className="h-6 w-6 text-yellow-500" />
              <span className="font-bold text-2xl">Bidding Process</span>
            </div>
            <p className="mb-3">
              A bidding process is in progress for{" "}
              <span className="font-bold">{currentSatellite?.name}</span>.
            </p>
            <p className="mb-3">
              Bid from operators of ${satellitesOfSecondaryInterest[0]}:
              <b>{highestBid} € </b>
            </p>
            <label htmlFor="userBid" className="block mt-2">
              Enter your bid:
            </label>
            <input
              type="number"
              id="userBid"
              className="border rounded px-2 py-1 mt-1 w-full"
              value={userBid !== null ? userBid : ""}
              onChange={(e) => setUserBid(parseFloat(e.target.value))}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 mx-2 rounded mt-2"
              onClick={handleBidSubmit}
            >
              Submit Bid
            </button>

            {highestBid && (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded m-2"
                onClick={handleAcceptBid}
              >
                Accept Bid
              </button>
            )}
          </div>
        )}

        {/* Placeholder for Graph */}
        {encounterDetails && encounterStage !== "initial" && (
          <section>
            <div className="border border-gray-200 rounded shadow p-4">
              <h1 className="text-2xl font-bold text-center">
                Predicted Encounter Graph
              </h1>

              {/* Use the EncounterGraph component */}
              <EncounterGraph
                timeRange={timeRange}
                distanceValues={distanceValues}
              />
            </div>
          </section>
        )}

        {/* Action List */}
        {currentSatellite?.actions.map((action) => (
          <Accordion key={action.id} className="w-full" variant="bordered">
            <AccordionItem
              key={action.id}
              title={
                <div className="flex justify-between items-center">
                  <span>{action.title}</span>
                  {renderStatusIcon(action.status)}
                </div>
              }
            >
              {action.steps.map((step, index) => (
                <div key={index} className="mb-4">
                  <h2 className="font-bold">{step.name}</h2>
                  <p
                    className={`${
                      step.name === "CDM Warning Issued" ||
                      step.name === "Situation Worsened"
                        ? "text-blue-500"
                        : "text-gray-700"
                    }`}
                  >
                    {step.textDescription}
                  </p>
                </div>
              ))}
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default DemoPage;

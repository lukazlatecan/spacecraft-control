"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { CheckCircleIcon, CogIcon, ClockIcon } from "@heroicons/react/24/solid";

interface Step {
  name: string;
  description: string;
  status: "pending" | "processing" | "done";
  special?: boolean;
}

interface Action {
  id: number;
  title: string;
  steps: Step[];
  status: "pending" | "processing" | "done";
}

interface Satellite {
  id: number;
  name: string;
  actions: Action[];
}

const DemoPage: React.FC = () => {
  const [satellites, setSatellites] = useState<Satellite[]>([
    { id: 1, name: "Satellite 1", actions: [] },
    { id: 2, name: "Satellite 2", actions: [] },
    { id: 3, name: "Satellite 3", actions: [] },
  ]);
  const [selectedSatellite, setSelectedSatellite] = useState<number>(1);
  const [highestBid, setHighestBid] = useState<number>(100);
  const [userBid, setUserBid] = useState<number | null>(null);

  const currentSatellite = satellites.find(
    (sat) => sat.id === selectedSatellite,
  );

  const addAction = (title: string, steps: Step[]): void => {
    if (!currentSatellite) return;

    const newAction: Action = {
      id: currentSatellite.actions.length + 1,
      title,
      steps,
      status: "pending",
    };

    setSatellites((prev) =>
      prev.map((sat) =>
        sat.id === selectedSatellite
          ? { ...sat, actions: [...sat.actions, newAction] }
          : sat,
      ),
    );
  };

  const processSteps = async (
    actionId: number,
    delay: number,
  ): Promise<void> => {
    if (!currentSatellite) return;

    const action = currentSatellite.actions.find((a) => a.id === actionId);

    if (!action) return;

    for (let i = 0; i < action.steps.length; i++) {
      setSatellites((prev) =>
        prev.map((sat) =>
          sat.id === selectedSatellite
            ? {
                ...sat,
                actions: sat.actions.map((a) =>
                  a.id === actionId
                    ? {
                        ...a,
                        steps: a.steps.map((step, index) =>
                          index === i
                            ? { ...step, status: "processing" }
                            : step,
                        ),
                        status: "processing",
                      }
                    : a,
                ),
              }
            : sat,
        ),
      );

      await new Promise((resolve) => setTimeout(resolve, delay));

      setSatellites((prev) =>
        prev.map((sat) =>
          sat.id === selectedSatellite
            ? {
                ...sat,
                actions: sat.actions.map((a) =>
                  a.id === actionId
                    ? {
                        ...a,
                        steps: a.steps.map((step, index) =>
                          index === i ? { ...step, status: "done" } : step,
                        ),
                        status:
                          i === action.steps.length - 1 ? "done" : "processing",
                      }
                    : a,
                ),
              }
            : sat,
        ),
      );
    }
  };

  const handleAction1 = (): void => {
    const steps = [
      {
        name: "Step 1.1",
        description: "First step of Action 1.",
        status: "pending",
      },
      {
        name: "Step 1.2",
        description: "Second step of Action 1.",
        status: "pending",
      },
    ];

    addAction(
      `Action ${currentSatellite?.actions.length + 1}: Custom Logic 1`,
      steps,
    );
    processSteps(currentSatellite?.actions.length + 1 || 1, 1000);
  };

  const handleAction2 = (): void => {
    const steps = [
      {
        name: "Step 2.1",
        description: "Bidding step with functionality.",
        status: "pending",
        special: true,
      },
    ];

    addAction(
      `Action ${currentSatellite?.actions.length + 1}: Bidding Action`,
      steps,
    );
  };

  const handleAction3 = (): void => {
    const steps = [
      {
        name: "Step 3.1",
        description: "First step of Action 3.",
        status: "pending",
      },
      {
        name: "Step 3.2",
        description: "Second step of Action 3.",
        status: "pending",
      },
    ];

    addAction(
      `Action ${currentSatellite?.actions.length + 1}: Custom Logic 3`,
      steps,
    );
    processSteps(currentSatellite?.actions.length + 1 || 1, 500);
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

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 md:py-10">
      <div className="col-span-2 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Satellite Monitoring System</h1>
        <p className="text-center text-gray-600">
          Manage actions and monitor status for your satellites.
        </p>
      </div>

      <div className="col-span-1 flex flex-col gap-4">
        <div className="flex justify-center gap-4">
          {satellites.map((satellite) => (
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

        {/* Buttons for Adding Actions */}
        <div className="flex gap-3 justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            onClick={handleAction1}
          >
            Trigger Action 1
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
            onClick={handleAction2}
          >
            Trigger Action 2
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600"
            onClick={handleAction3}
          >
            Trigger Action 3
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">
            Actions for {currentSatellite?.name || "No Satellite Selected"}
          </h1>
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
                    <p className="text-gray-700">{step.description}</p>
                    {step.special && step.status !== "done" && (
                      <div className="mt-2">
                        <p>Current highest bid: {highestBid}</p>
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded shadow hover:bg-blue-600 mr-2"
                          onClick={() => handleBidSubmit(action.id, highestBid)}
                        >
                          Accept Bid
                        </button>
                        <input
                          className="border rounded px-2 py-1 mr-2"
                          placeholder="Enter your bid"
                          type="number"
                          value={userBid || ""}
                          onChange={(e) => setUserBid(Number(e.target.value))}
                        />
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded shadow hover:bg-green-600"
                          onClick={() =>
                            userBid && handleBidSubmit(action.id, userBid)
                          }
                        >
                          Submit Bid
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoPage;

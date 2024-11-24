"use client";

import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

interface EncounterGraphProps {
  timeRange: number[];
  distanceValues: number[];
}

const EncounterGraph: React.FC<EncounterGraphProps> = ({
  timeRange,
  distanceValues,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(
        window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    };

    // Initial check
    checkDarkMode();

    // Listen for changes
    const darkModeListener = window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", checkDarkMode);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", checkDarkMode);
    };
  }, []);
  const minimumDistance = Math.min(...distanceValues);
  const encounterGraphData: Partial<Plotly.Data>[] = [
    {
      x: timeRange,
      y: distanceValues,
      type: "scatter",
      mode: "lines",
      name: "Encounter Distance",
      line: { color: "blue", width: 2 },
    },
    {
      x: [timeRange[0], timeRange[timeRange.length - 1]],
      y: [10000, 10000],
      type: "scatter",
      mode: "lines",
      name: "WARNING Threshold (10km)",
      line: { color: "orange", dash: "dash" },
    },
    {
      x: [timeRange[0], timeRange[timeRange.length - 1]],
      y: [5000, 5000],
      type: "scatter",
      mode: "lines",
      name: "ALERT Threshold (5km)",
      line: { color: "red", dash: "dash" },
    },
    {
      x: [timeRange[0], timeRange[timeRange.length - 1]],
      y: [minimumDistance, minimumDistance],
      type: "scatter",
      mode: "lines",
      name: `Closest Approach Threshold (${minimumDistance.toFixed(0)}m)`,
      line: { color: "blue", dash: "dash" },
    },
  ];

  const encounterGraphLayout: Partial<Plotly.Layout> = {
    title: {
      text: "Predicted Encounter Distance in Orbit",
      font: { color: "#FFFFFF", size: 16 },
    },
    xaxis: {
      title: {
        text: "Time (seconds relative to TCA)",
        font: { color: "#FFFFFF", size: 14 },
      },
      tickfont: { color: "#FFFFFF" },
      gridcolor: "#444444",
    },
    yaxis: {
      title: {
        text: "Distance (meters)",
        font: { color: "#FFFFFF", size: 14 },
      },
      tickfont: { color: "#FFFFFF" },
      gridcolor: "#444444",
    },
    legend: {
      font: { color: "#FFFFFF" },
      orientation: "h",
      x: 0.5,
      y: -0.2,
      xanchor: "center",
    },
    margin: { l: 50, r: 50, t: 50, b: 50 },
    height: 400,
    paper_bgcolor: "#000000", // Set background to black
    plot_bgcolor: "#000000", // Set plot area background to black
  };

  return (
    <div>
      <Plot
        data={encounterGraphData}
        layout={encounterGraphLayout}
        style={{ width: "100%" }}
        config={{ displayModeBar: false }} // Optional: Disable mode bar
      />
    </div>
  );
};

export default EncounterGraph;

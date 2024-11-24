import { getCachedData, setCachedData, isCacheValid } from "./cacheUtils";

const SATELLITE_CACHE_KEY = "satelliteData";

export interface Step {
  name: string;
  description: string;
  status: "pending" | "processing" | "done";
  special?: boolean;
}
export interface Action {
  id: number;
  title: string;
  steps: Step[];
  status: "pending" | "processing" | "done";
}

export interface Satellite {
  id: number;
  name: string;
  tle1: string;
  tle2: string;
  actions: Action[];
}
const fetchSatelliteTLEs = async (): Promise<Satellite[]> => {
  // Check if cached data is valid
  if (isCacheValid(SATELLITE_CACHE_KEY)) {
    return getCachedData(SATELLITE_CACHE_KEY).data;
  }

  // Fetch fresh data
  try {
    const response = await fetch(
      "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle",
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();

    const lines = data.split("\n").filter((line) => line.trim().length > 0);
    const satellites: Satellite[] = [];

    for (let i = 0; i < lines.length; i += 3) {
      if (lines[i + 1] && lines[i + 2]) {
        satellites.push({
          name: lines[i].trim(),
          tle1: lines[i + 1].trim(),
          tle2: lines[i + 2].trim(),
          id: i,
          actions: [],
        });
      }
    }

    // Cache the data for 1 hour
    setCachedData(SATELLITE_CACHE_KEY, satellites, 120);

    return satellites;
  } catch (error) {
    // Fall back to cached data if available
    const cachedData = getCachedData(SATELLITE_CACHE_KEY);

    if (cachedData) {
      return cachedData.data;
    }
    throw new Error("Satellite data unavailable.");
  }
};

export { fetchSatelliteTLEs };

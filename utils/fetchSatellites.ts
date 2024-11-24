import { getCachedData, setCachedData, isCacheValid } from "./cacheUtils";

const SATELLITE_CACHE_KEY = "satelliteData";

export interface Step {
  name: string;
  description: any;
  textDescription: string;
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
      "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle"
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

const EARTH_RADIUS_KM = 6371; // Approximate Earth's radius in kilometers
const LOW_ORBIT_THRESHOLD = 600000; // Define a threshold for low orbit (e.g., 2000 km altitude)

// Utility to parse TLE data and calculate approximate altitude
const calculatePerigeeFromTLE = (tle1: any, tle2: any) => {
  const eccentricity = parseFloat(`0.${tle2.substring(26, 33).trim()}`);
  const mean_motion = parseFloat(tle2.substring(52, 63).trim());

  const semi_major_axis_km =
    Math.pow(86400 / (mean_motion * 2 * Math.PI), 2 / 3) * EARTH_RADIUS_KM;
  const perigee_altitude_km =
    semi_major_axis_km * (1 - eccentricity) - EARTH_RADIUS_KM;

  return perigee_altitude_km;
};

const fetchAndFilterSatelliteTLEs = async (): Promise<Satellite[]> => {
  const satellites = await fetchSatelliteTLEs();
  return satellites.filter((satellite) => {
    const perigee = calculatePerigeeFromTLE(satellite.tle1, satellite.tle2);
    return perigee <= LOW_ORBIT_THRESHOLD;
  });
};

export { fetchSatelliteTLEs, fetchAndFilterSatelliteTLEs };

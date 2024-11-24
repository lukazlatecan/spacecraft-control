import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { twoline2satrec, propagate, SatRec } from "satellite.js";
import { Satellite } from "@/utils/fetchSatellites";

interface ThreeEarthProps {
  satellites: Satellite[];
  satellitesOfInterest: string[];
  satellitesOfSecondaryInterest: string[];
  ofInterestColor: string;
  ofSecondaryInterestColor: string;
  triggerZoom: boolean;
  triggerManeuver: boolean; // New prop to trigger the maneuver
}

const createScene = (container: HTMLDivElement) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(20, 15, 20);
  controls.update();

  return { scene, camera, renderer, controls };
};

const createEarth = (showNightLights: boolean): THREE.Mesh => {
  console.log("createEarth");
  const earthGeometry = new THREE.SphereGeometry(10, 64, 64);
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("/assets/Albedo.jpg"),
    bumpMap: new THREE.TextureLoader().load("/assets/Bump.jpg"),
    bumpScale: 0.03,
    emissiveMap: showNightLights
      ? new THREE.TextureLoader().load("/assets/night_lights_modified.png")
      : null,
  });
  return new THREE.Mesh(earthGeometry, earthMaterial);
};

const ThreeEarth: React.FC<ThreeEarthProps> = ({
  satellites,
  satellitesOfInterest,
  satellitesOfSecondaryInterest,
  ofInterestColor = "#ff0000",
  ofSecondaryInterestColor = "#ffa500",
  triggerZoom = false,
  triggerManeuver = false, // New prop
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const sliderValueRef = useRef(50);
  const showNightLights = false;
  const maneuveredSatellites = useRef<Map<string, SatRec>>(new Map()); // Store new satrecs
  const maneuveredSatellitesSet = useRef<Set<string>>(new Set()); // Track maneuvered satellites
  const oldOrbitLines = useRef<Map<string, THREE.Line>>(new Map()); // Store old orbit lines
  const isZoomAnimating = useRef(false);
  const initialCameraPositionRef = useRef<THREE.Vector3>();
  const initialTargetRef = useRef<THREE.Vector3>();
  const simulationTime = useRef(new Date());
  const earthRef = useRef<THREE.Mesh | null>(null);
  useEffect(() => {
    if (!containerRef.current || satellites.length === 0) return;

    const { scene, camera, renderer, controls } = createScene(
      containerRef.current
    );
    sceneRef.current = scene;
    cameraRef.current = camera;
    controlsRef.current = controls;

    // Store initial camera position and target
    initialCameraPositionRef.current = camera.position.clone();
    initialTargetRef.current = controls.target.clone();

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50);
    scene.add(ambientLight, directionalLight);
    console.log("earthRef.current", earthRef.current);
    // Create Earth only once
    if (!earthRef.current) {
      earthRef.current = createEarth(showNightLights);
    }
    scene.add(earthRef.current);

    // Satellite Instanced Meshes
    const satelliteMeshes = {
      interest: new THREE.InstancedMesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshBasicMaterial({ color: ofInterestColor }),
        satellitesOfInterest.length
      ),
      secondaryInterest: new THREE.InstancedMesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshBasicMaterial({ color: ofSecondaryInterestColor }),
        satellitesOfSecondaryInterest.length
      ),
      others: new THREE.InstancedMesh(
        new THREE.SphereGeometry(0.1, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        satellites.length -
          satellitesOfInterest.length -
          satellitesOfSecondaryInterest.length
      ),
    };

    Object.values(satelliteMeshes).forEach((mesh) => scene.add(mesh));

    // Function to calculate an orbit
    const calculateOrbit = (
      satrec: SatRec,
      time: Date,
      color: string,
      dashed: boolean = false
    ): THREE.Line => {
      const points: THREE.Vector3[] = [];

      const timeForAFullOrbit = (2.0 * Math.PI) / satrec.no; // Approximate orbital period
      for (let i = 0; i < timeForAFullOrbit * 60; i += 60) {
        const currentTime = new Date(time.getTime() + i * 1000);
        const positionAndVelocity = propagate(satrec, currentTime);

        if (
          positionAndVelocity.position &&
          typeof positionAndVelocity.position !== "boolean"
        ) {
          const positionEci = positionAndVelocity.position;

          const scale = 10 / 6371; // Earth radius in km
          const x = positionEci.x * scale;
          const y = positionEci.y * scale;
          const z = positionEci.z * scale;

          points.push(new THREE.Vector3(x, y, z));
        }
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      let material: THREE.LineBasicMaterial | THREE.LineDashedMaterial;
      if (dashed) {
        material = new THREE.LineDashedMaterial({
          color: color,
          dashSize: 1,
          gapSize: 1,
        });
      } else {
        material = new THREE.LineBasicMaterial({
          color: color,
        });
      }

      const line = new THREE.Line(geometry, material);
      if (dashed) {
        line.computeLineDistances(); // Required for dashed lines
      }
      return line;
    };

    // Add orbits for satellites of interest and secondary interest
    satellites.forEach((satelliteData) => {
      if (
        satellitesOfInterest.includes(satelliteData.name) ||
        satellitesOfSecondaryInterest.includes(satelliteData.name)
      ) {
        const satrec = twoline2satrec(satelliteData.tle1, satelliteData.tle2);
        const orbit = calculateOrbit(
          satrec,
          simulationTime.current,
          satellitesOfInterest.includes(satelliteData.name)
            ? ofInterestColor
            : ofSecondaryInterestColor
        );
        scene.add(orbit);
      }
    });

    // Update satellite positions
    const updateSatellitePositions = (time: Date) => {
      const matrices: any = {
        interest: [],
        secondaryInterest: [],
        others: [],
      };

      let interestIndex = 0;
      let secondaryInterestIndex = 0;
      let othersIndex = 0;

      satellites.forEach((satelliteData) => {
        let satrec = twoline2satrec(satelliteData.tle1, satelliteData.tle2);

        // Check if the satellite is maneuvered
        if (maneuveredSatellites.current.has(satelliteData.name)) {
          satrec = maneuveredSatellites.current.get(satelliteData.name)!;
        } else if (
          triggerManeuver &&
          satellitesOfInterest.includes(satelliteData.name) &&
          !maneuveredSatellitesSet.current.has(satelliteData.name)
        ) {
          // Before maneuvering, calculate the old orbit and create a dashed line
          const oldOrbit = calculateOrbit(
            satrec,
            simulationTime.current,
            ofInterestColor,
            true // Dashed line
          );
          sceneRef.current?.add(oldOrbit);
          console.log("oldOrbit", oldOrbit);

          // Store the old orbit line to remove it later
          oldOrbitLines.current.set(satelliteData.name, oldOrbit);

          // Remove the old orbit after a few seconds
          setTimeout(() => {
            sceneRef.current?.remove(oldOrbit);
            oldOrbit.geometry.dispose();
            oldOrbitLines.current.delete(satelliteData.name);
          }, 5000); // Remove after 5 seconds

          // Apply maneuver by adjusting the mean motion
          const deltaNo = satrec.no * 0.01; // Adjust by 0.1%
          satrec.no += deltaNo;

          // Update related parameters
          satrec.ndot = 0; // Assuming no change in mean motion derivative
          satrec.nddot = 0;

          // After maneuvering, calculate the new orbit and create a solid line
          const newOrbit = calculateOrbit(
            satrec,
            simulationTime.current,
            ofInterestColor,
            false // Solid line
          );
          sceneRef.current?.add(newOrbit);

          // Store the new satrec
          maneuveredSatellites.current.set(satelliteData.name, satrec);

          // Mark the satellite as maneuvered
          maneuveredSatellitesSet.current.add(satelliteData.name);
        }

        const positionAndVelocity = propagate(satrec, time);

        if (
          positionAndVelocity.position &&
          typeof positionAndVelocity.position !== "boolean"
        ) {
          const { x, y, z } = positionAndVelocity.position;
          const scale = 10 / 6371;
          const matrix = new THREE.Matrix4().setPosition(
            x * scale,
            y * scale,
            z * scale
          );

          if (satellitesOfInterest.includes(satelliteData.name)) {
            matrices.interest.push({ matrix, index: interestIndex++ });
          } else if (
            satellitesOfSecondaryInterest.includes(satelliteData.name)
          ) {
            matrices.secondaryInterest.push({
              matrix,
              index: secondaryInterestIndex++,
            });
          } else {
            matrices.others.push({ matrix, index: othersIndex++ });
          }
        }
      });

      ["interest", "secondaryInterest", "others"].forEach((key) => {
        const mesh = (satelliteMeshes as any)[key];
        matrices[key].forEach((item: any) => {
          mesh.setMatrixAt(item.index, item.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
      });
    };

    // Animation loop
    const animate = () => {
      if (!isZoomAnimating.current) {
        const timeIncrement = (sliderValueRef.current * 1000) / 60;
        simulationTime.current = new Date(
          simulationTime.current.getTime() + timeIncrement
        );

        updateSatellitePositions(simulationTime.current);
      }

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (renderer) {
        renderer.dispose(); // Dispose of the renderer
      }
      scene.clear(); // Remove all objects from the scene
      if (renderer.domElement) {
        renderer.domElement.remove(); // Remove the canvas element
      }
    };
  }, [
    satellites,
    satellitesOfInterest,
    satellitesOfSecondaryInterest,
    triggerManeuver,
  ]);

  const animateZoomToSatellites = () => {
    if (!cameraRef.current || !controlsRef.current) return;

    const camera = cameraRef.current;
    const controls = controlsRef.current;

    // Disable controls during animation
    controls.enabled = false;
    isZoomAnimating.current = true;

    const valueOfRef = sliderValueRef.current;
    sliderValueRef.current = 10;

    // Find the average position of satellitesOfInterest
    const positions = satellites
      .filter((sat) => satellitesOfInterest.includes(sat.name))
      .map((sat) => {
        const satrec = twoline2satrec(sat.tle1, sat.tle2);
        const positionAndVelocity = propagate(satrec, simulationTime.current);

        if (
          positionAndVelocity.position &&
          typeof positionAndVelocity.position !== "boolean"
        ) {
          const { x, y, z } = positionAndVelocity.position;
          const scale = 10 / 6371;

          return new THREE.Vector3(x * scale, y * scale, z * scale);
        }
        return null;
      })
      .filter((pos): pos is THREE.Vector3 => pos !== null);

    if (positions.length === 0) {
      controls.enabled = true;
      isZoomAnimating.current = false;
      return;
    }

    // Calculate the average position
    const targetPosition = positions
      .reduce((acc, pos) => acc.add(pos), new THREE.Vector3())
      .divideScalar(positions.length); // Average position

    // Use stored initial positions
    const initialCameraPosition = initialCameraPositionRef.current!.clone();
    const initialTarget = initialTargetRef.current!.clone();

    // Compute direction from initial camera position to target position
    const directionToTarget = targetPosition
      .clone()
      .sub(initialCameraPosition)
      .normalize();

    // Set final camera position at a certain distance from target position
    const zoomInDistance = 5; // Adjust this value to control zoom level
    const finalCameraPosition = targetPosition
      .clone()
      .sub(directionToTarget.multiplyScalar(zoomInDistance));

    const zoomDuration = 1000; // Duration of zoom in ms
    const zoomOutDelay = 1500; // Wait before zooming out in ms

    let startTime: number | null = null;

    const zoomInAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / zoomDuration, 1);

      // Interpolate camera position and target
      camera.position.lerpVectors(
        initialCameraPosition,
        finalCameraPosition,
        t
      );
      controls.target.lerpVectors(initialTarget, targetPosition, t);
      controls.update();

      if (t < 1) {
        requestAnimationFrame(zoomInAnimation);
      } else {
        // Ensure final position is set
        camera.position.copy(finalCameraPosition);
        controls.target.copy(targetPosition);
        controls.update();

        // Restore slider value
        sliderValueRef.current = valueOfRef;

        // Start zoom-out after a delay
        setTimeout(() => {
          startTime = null;
          requestAnimationFrame(zoomOutAnimation);
        }, zoomOutDelay);
      }
    };

    const zoomOutAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / zoomDuration, 1);

      // Interpolate back to initial positions
      camera.position.lerpVectors(
        finalCameraPosition,
        initialCameraPosition,
        t
      );
      controls.target.lerpVectors(targetPosition, initialTarget, t);
      controls.update();

      if (t < 1) {
        requestAnimationFrame(zoomOutAnimation);
      } else {
        // Ensure final position is set
        camera.position.copy(initialCameraPosition);
        controls.target.copy(initialTarget);
        controls.update();

        // Re-enable controls and reset animation flag
        controls.enabled = true;
        isZoomAnimating.current = false;
      }
    };

    requestAnimationFrame(zoomInAnimation);
  };

  useEffect(() => {
    if (triggerZoom) {
      animateZoomToSatellites();
    }
  }, [triggerZoom]);

  return (
    <div style={{ height: "80vh", position: "relative" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      <input
        type="range"
        min="1"
        max="500"
        defaultValue={sliderValueRef.current}
        onChange={(e) => {
          sliderValueRef.current = parseInt(e.target.value, 10);
        }}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "150px",
          width: "300px",
        }}
      />
    </div>
  );
};

export default ThreeEarth;

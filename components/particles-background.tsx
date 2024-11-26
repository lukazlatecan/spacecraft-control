"use client";
import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Container } from "@tsparticles/engine";

import particlesConfig from "@/config/particles-config"; // Import your configuration file

const ParticlesBackground: React.FC = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (
    container?: Container | undefined,
  ): Promise<void> => {
    console.log(container);
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={particlesConfig}
        particlesLoaded={particlesLoaded}
      />
    );
  }

  return <></>;
};

export default ParticlesBackground;

import { type ISourceOptions } from "@tsparticles/engine";

const particlesConfig: ISourceOptions = {
  autoPlay: true,
  background: {
    color: {
      value: "#000",
    },
    opacity: 1,
  },
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  detectRetina: true,
  fpsLimit: 60,
  interactivity: {
    detectsOn: "window",
    events: {
      onClick: {
        enable: false,
        mode: [],
      },
      onHover: {
        enable: false,
        mode: [],
      },
      resize: {
        enable: true,
        delay: 0.5,
      },
    },
    modes: {},
  },
  particles: {
    number: {
      value: 200, // Number of stars
      density: {
        enable: true,
      },
    },
    color: {
      value: "#fff", // Star color
    },
    opacity: {
      value: {
        min: 0.3,
        max: 1, // Shining intensity range
      },
      animation: {
        enable: true,
        speed: 1, // Speed of the shine effect
        sync: false,
      },
    },
    size: {
      value: 1, // Star size
    },
    move: {
      enable: true,
      speed: 0.2, // Slow star movement
      direction: "none", // Random movement direction
      outModes: {
        default: "out", // Stars will reappear after moving out
      },
    },
    links: {
      enable: false, // Disable lines between stars
    },
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
};

export default particlesConfig;

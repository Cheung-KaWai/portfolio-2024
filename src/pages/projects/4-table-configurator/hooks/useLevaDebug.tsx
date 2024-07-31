import { useControls } from "leva";

export const useLevaDebug = () => {
  const controls = useControls({
    progress: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    wireframe: {
      value: false,
    },
    depth: {
      value: 0.03,
      min: 0,
      max: 1,
      step: 0.01,
    },
    offset: {
      value: 0,
      min: 0,
      max: 3,
      step: 0.01,
    },
    length: {
      value: 1,
      min: 0,
      max: 3,
      step: 0.01,
    },
  });

  return controls;
};

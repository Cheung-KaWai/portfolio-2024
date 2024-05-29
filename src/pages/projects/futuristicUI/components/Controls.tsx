import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

export const Controls = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [controls, _set] = useControls("Obitcontrols", () => ({
    enable: false,
  }));

  return <OrbitControls enabled={controls.enable} />;
};

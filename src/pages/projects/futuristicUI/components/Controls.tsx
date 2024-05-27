import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

export const Controls = () => {
  const [controls, _set] = useControls("Obitcontrols", () => ({
    enable: false,
  }));

  return <OrbitControls enabled={controls.enable} />;
};

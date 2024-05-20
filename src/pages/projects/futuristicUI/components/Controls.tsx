import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

export const Controls = () => {
  const [controls, _set] = useControls("Obitcontrols", () => ({
    enable: true,
  }));

  return <OrbitControls enabled={controls.enable} />;
};

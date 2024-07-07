import { MapControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MagicCircle } from "./components/MagicCircle";
import { Effects } from "./components/Effects";

export const MagicSummoningCircles = () => {
  return (
    <Canvas>
      <Effects />
      <MagicCircle />
      <MapControls object-position={[0, 5, 5]} />
    </Canvas>
  );
};

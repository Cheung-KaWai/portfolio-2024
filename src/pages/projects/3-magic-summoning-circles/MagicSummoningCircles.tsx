import { Environment, MapControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MagicCircle } from "./components/MagicCircle";
import { Effects } from "./components/Effects";
import { Crystal } from "./components/Crystal";

export const MagicSummoningCircles = () => {
  return (
    <Canvas>
      <Effects />
      <Crystal />
      <MagicCircle />
      <Environment preset="studio" />
      <MapControls object-position={[0, 5, 5]} />
    </Canvas>
  );
};

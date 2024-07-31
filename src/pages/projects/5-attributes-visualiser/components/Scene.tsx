import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { Visualiser } from "./Visualiser";

export const Scene = () => {
  return (
    <Canvas>
      <Model />
      <OrbitControls />
      <Visualiser />
    </Canvas>
  );
};

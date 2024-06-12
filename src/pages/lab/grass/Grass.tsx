import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { GrassBlades } from "./components/GrassBlades";

export const Grass = () => {
  return (
    <Canvas>
      <GrassBlades />
      <OrbitControls />
    </Canvas>
  );
};

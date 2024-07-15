import { Canvas } from "@react-three/fiber";
import { TableTop } from "./TableTop";
import { Environment, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

export const Scene = () => {
  return (
    <Canvas>
      <Perf position="top-left" />
      <TableTop />
      <OrbitControls object-position={[0, 1, 1]} />
      <Environment preset="studio" />
    </Canvas>
  );
};

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Sphere } from "./components/Sphere";
import { Perf } from "r3f-perf";

export const WobblySphere = () => {
  return (
    <Canvas shadows>
      <Perf />
      <directionalLight position={[2, 2, 0]} castShadow />
      <Sphere />
      <OrbitControls />
      <mesh receiveShadow scale={100} rotation-x={-Math.PI / 2} position-y={-3}>
        <planeGeometry />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  );
};

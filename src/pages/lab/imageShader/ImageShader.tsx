import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PlaneImage } from "./components/PlaneImage";

export const ImageShader = () => {
  return (
    <Canvas camera={{ fov: 50 }}>
      <PlaneImage />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
    </Canvas>
  );
};

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PlaneImage } from "./PlaneImage";

export const ImageShader = () => {
  return (
    <Canvas>
      <PlaneImage />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
    </Canvas>
  );
};

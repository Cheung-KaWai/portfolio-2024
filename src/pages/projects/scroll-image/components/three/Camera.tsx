import { PerspectiveCamera } from "@react-three/drei";

export const Camera = () => {
  const CAMERA_POS = 100;
  const calcFov = () => (2 * Math.atan(window.innerHeight / 2 / CAMERA_POS) * 180) / Math.PI;

  return <PerspectiveCamera name="hello" makeDefault position={[0, 0, CAMERA_POS]} fov={calcFov()} />;
};

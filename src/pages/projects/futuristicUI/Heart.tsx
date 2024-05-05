import { useGLTF } from "@react-three/drei";

export const Heart = () => {
  const { scene } = useGLTF("/heart.glb");

  return <primitive object={scene} />;
};

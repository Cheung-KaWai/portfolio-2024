/* eslint-disable react-hooks/exhaustive-deps */
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useEffect } from "react";

export const Crystal = () => {
  const { scene } = useGLTF("/3-magic-summoning-circles/crystal.glb");

  useEffect(() => {
    console.log(scene);
    scene.scale.set(0, 0, 0);
    gsap.to(scene.scale, { x: 2, y: 2, z: 2 });
  }, []);

  return <primitive object={scene} />;
};

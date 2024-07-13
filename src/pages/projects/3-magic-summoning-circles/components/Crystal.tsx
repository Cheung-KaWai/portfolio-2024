/* eslint-disable react-hooks/exhaustive-deps */
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useLayoutEffect } from "react";
import { useMagicData } from "../hooks/useMagicData";

export const Crystal = () => {
  const { scene } = useGLTF("/3-magic-summoning-circles/crystal.glb");
  const { activate, typeCircle } = useMagicData();

  useLayoutEffect(() => {
    scene.scale.set(0, 0, 0);
  }, []);

  useEffect(() => {
    if (activate && typeCircle === "water") {
      gsap.to(scene.scale, { x: 2, y: 2, z: 2 });
    } else {
      gsap.to(scene.scale, { x: 0, y: 0, z: 0 });
    }
  }, [activate, typeCircle]);

  return <primitive object={scene} />;
};

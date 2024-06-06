import { Box } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Mesh } from "three";

export const Model = () => {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      console.log(meshRef.current);
    }
  }, []);

  return <Box ref={meshRef} />;
};

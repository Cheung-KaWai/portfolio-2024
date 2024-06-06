/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import { useUvViewer } from "../store/uvStore";

export const Model = () => {
  const meshRef = useRef<Mesh>(null);

  const { update } = useUvViewer();

  useEffect(() => {
    if (meshRef.current) {
      update({ geo: meshRef.current });
    }
  }, []);

  return <Box ref={meshRef} />;
};

/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Cylinder, Sphere, Torus } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import { useUvViewer } from "../store/uvStore";

export const Model = () => {
  const meshRef = useRef<Mesh>(null);

  const { update, mesh } = useUvViewer();

  type listMeshesKey = "box" | "torus" | "cylinder" | "sphere";

  const listMeshes = {
    box: Box,
    torus: Torus,
    cylinder: Cylinder,
    sphere: Sphere,
  };

  const ChoosenMesh = listMeshes[mesh as listMeshesKey];

  useEffect(() => {
    if (meshRef.current) {
      update({ geo: meshRef.current });
    }
  }, [mesh]);

  return <ChoosenMesh ref={meshRef} />;
};

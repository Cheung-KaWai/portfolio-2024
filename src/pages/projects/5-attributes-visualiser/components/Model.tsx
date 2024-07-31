/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";
import { Mesh } from "three";
import { useAttributeVisualiserStore } from "../store/useAttributeVisualiserStore";

export const Model = () => {
  const ref = useRef<Mesh>(null);
  const update = useAttributeVisualiserStore((state) => state.update);

  useLayoutEffect(() => {
    if (ref.current) {
      update({ object: ref.current });
      console.log("updated");
    }
  }, []);

  return <Box ref={ref} material-wireframe />;
};

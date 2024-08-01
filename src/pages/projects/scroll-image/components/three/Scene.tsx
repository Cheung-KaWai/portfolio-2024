import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import { Camera } from "./Camera.tsx";
import { ImagePlanes } from "./ImagePlanes.tsx";

export const Scene = () => {
  return (
    <Container>
      <Canvas>
        <Camera />
        <Box />
        <ImagePlanes />
      </Canvas>
    </Container>
  );
};

const Container = styled.div`
  width: 100svw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

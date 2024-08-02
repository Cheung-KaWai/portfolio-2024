import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import { Camera } from "./Camera.tsx";
import { PlaneImages } from "./PlaneImages/index.tsx";

export const Scene = () => {
  return (
    <Container>
      <Canvas>
        <Camera />
        <PlaneImages />
      </Canvas>
    </Container>
  );
};

const Container = styled.div`
  width: 100svw;
  height: 100svh;
  position: fixed;
  top: 0;
  left: 0;
`;

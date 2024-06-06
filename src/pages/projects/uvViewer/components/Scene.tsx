import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { OrbitControls } from "@react-three/drei";
import styled from "styled-components";

export const Scene = () => {
  return (
    <Container>
      <Canvas>
        <Model />
        <OrbitControls />
      </Canvas>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
`;

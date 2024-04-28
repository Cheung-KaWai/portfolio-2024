import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import vertex from "@shaders/background/vertex.glsl";
import fragment from "@shaders/background/fragment.glsl";

export const Background = () => {
  return (
    <CanvasContainer>
      <BackgroundContent />
    </CanvasContainer>
  );
};

const BackgroundContent = () => {
  return (
    <>
      <OrthographicCamera position={[0, 0, 1]} left={-0.5} right={0.5} top={0.5} bottom={-0.5} makeDefault manual />
      <mesh>
        <planeGeometry args={[0.5, 0.5]} />
        <shaderMaterial vertexShader={vertex} fragmentShader={fragment} />
      </mesh>
    </>
  );
};

const CanvasContainer = styled(Canvas)`
  canvas {
    min-height: 100svh;
  }
`;

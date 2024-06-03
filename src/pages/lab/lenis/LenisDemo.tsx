import ReactLenis from "lenis/react";
import styled from "styled-components";
import { Image } from "./Image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useControls } from "leva";

gsap.registerPlugin(ScrollTrigger);
const amountOfImages = new Array(5).fill(0);

type DebugProps = {
  showDebug: boolean;
};

export const LenisDemo = () => {
  const [controls, _set] = useControls(() => ({
    showDebug: false,
  }));

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.2,
      }}
    >
      <Container>
        <ScrollContainer showDebug={controls.showDebug}>
          {amountOfImages.map((_, index) => (
            <Image src="/imageShader/tower.png" key={index} offset={index} showDebug={controls.showDebug} />
          ))}
        </ScrollContainer>
      </Container>
    </ReactLenis>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15rem;
  background-color: #111120;
`;

const ScrollContainer = styled.div<DebugProps>`
  width: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => (props.showDebug ? "white" : "transparent")};
  padding: 2rem;
  gap: 10rem;
`;

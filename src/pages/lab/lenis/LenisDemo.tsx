import ReactLenis from "lenis/react";
import styled from "styled-components";
import { Image } from "./Image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const amountOfImages = new Array(5).fill(0);

export const LenisDemo = () => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.2,
      }}
    >
      <Container>
        <ScrollContainer>
          {amountOfImages.map((_, index) => (
            <Image src="/imageShader/tower.png" key={index} offset={index} />
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

const ScrollContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  /* border: 1px solid white; */
  padding: 2rem;
  gap: 10rem;
  /* overflow-y: scroll; */
`;

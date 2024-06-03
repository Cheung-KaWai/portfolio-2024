import gsap from "gsap";
import { FC, useEffect, useRef } from "react";
import styled from "styled-components";

export const Image: FC<{ src: string; offset: number; showDebug: boolean }> = ({ src, offset, showDebug }) => {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.to(ref.current, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "100 bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <MaskImage offset={offset} showDebug={showDebug}>
      <ImageContent src={src} ref={ref} />
    </MaskImage>
  );
};

const ImageContent = styled.img`
  height: 150%;
  aspect-ratio: 1;
`;

const MaskImage = styled.div<{ offset: number; showDebug: boolean }>`
  margin-left: ${(props) => `${props.offset * 200}px`};
  height: 30rem;
  border: 1px solid ${(props) => (props.showDebug ? "red" : "transparent")};
  overflow: ${(props) => (props.showDebug ? "default" : "hidden")};
  width: fit-content;
`;

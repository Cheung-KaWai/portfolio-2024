import gsap from "gsap";
import { FC, useEffect, useRef } from "react";
import styled from "styled-components";

export const Image: FC<{ src: string; offset: number }> = ({ src, offset }) => {
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
    <MaskImage offset={offset}>
      <ImageContent src={src} ref={ref} />
    </MaskImage>
  );
};

const ImageContent = styled.img`
  height: 150%;
  aspect-ratio: 1;
`;

const MaskImage = styled.div<{ offset: number }>`
  margin-left: ${(props) => `${props.offset * 200}px`};
  height: 30rem;
  /* border: 1px solid red; */
  overflow: hidden;
  width: fit-content;
`;

import { FC } from "react";
import styled from "styled-components";

type ImageProps = {
  $gridColumnStart: string;
  $gridColumnEnd: string;
  $gridRowStart: string;
  $gridRowEnd?: string;
};

type TextProps = {
  $gridColumnStart: string;
  $gridRowStart: string;
};

export const Image: FC<ImageProps> = (props) => {
  return (
    <>
      <StyledImage src="/scroll-image/tower.png" {...props} data-webgl-media />
      <ImageDescription $gridColumnStart={props.$gridColumnEnd} $gridRowStart={props.$gridRowStart}>
        Hello
      </ImageDescription>
    </>
  );
};

const StyledImage = styled.img<ImageProps>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  grid-column: ${(props) => `${props.$gridColumnStart} / ${props.$gridColumnEnd}`};
  grid-row: ${(props) => `${props.$gridRowStart} / ${props.$gridRowEnd ?? props.$gridRowStart}`};
`;

const ImageDescription = styled.p<TextProps>`
  place-self: end start;
  color: white;
  grid-column: ${(props) => props.$gridColumnStart};
  grid-row: ${(props) => props.$gridRowStart};
`;

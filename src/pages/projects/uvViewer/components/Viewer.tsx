import styled from "styled-components";
import { useUvViewer } from "../store/uvStore";
import { useState } from "react";

export const Viewer = () => {
  const { geo, update } = useUvViewer();
  const [dimensions, _setDimensions] = useState({ width: 400, height: 400, size: 2 });

  if (geo) {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas!.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      const uvs = geo.geometry.attributes.uv;
      const indices = geo.geometry.index!.array;

      //dots
      for (let i = 0; i < uvs.array.length; i = i + 2) {
        const x = uvs.array[i];
        const y = uvs.array[i + 1];
        ctx.fillRect(x * dimensions.width - dimensions.size / 2, y * dimensions.height - dimensions.size / 2, dimensions.size, dimensions.size);
      }

      ctx.beginPath();
      //lines
      for (let i = 0; i < indices.length; i++) {
        const index = indices[i];
        const x = uvs.array[index * 2] * dimensions.width;
        const y = uvs.array[index * 2 + 1] * dimensions.height;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }
  }

  return (
    <Container>
      <StyledCanvas id="canvas" height={dimensions.height} width={dimensions.width}></StyledCanvas>
      <ButtonContainer>
        <Button
          onClick={() => {
            update({ mesh: "box" });
          }}
        >
          box
        </Button>
        <Button
          onClick={() => {
            update({ mesh: "torus" });
          }}
        >
          torus
        </Button>
        <Button
          onClick={() => {
            update({ mesh: "cylinder" });
          }}
        >
          cylinder
        </Button>
        <Button
          onClick={() => {
            update({ mesh: "sphere" });
          }}
        >
          sphere
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  background-color: #efefef;
  color: #919191;
  padding: 0.5em 1.2em;
  border-radius: 3px;
`;

const StyledCanvas = styled.canvas``;

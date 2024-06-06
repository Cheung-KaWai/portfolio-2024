import styled from "styled-components";
import { useUvViewer } from "../store/uvStore";
import { useState } from "react";

export const Viewer = () => {
  const { geo } = useUvViewer();
  const [dimensions, _setDimensions] = useState({ width: 400, height: 400, size: 1 });

  if (geo) {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas!.getContext("2d");

    if (ctx) {
      const uvs = geo.geometry.attributes.uv;

      for (let i = 0; i < uvs.array.length; i = i + 2) {
        const x = uvs.array[i];
        const y = uvs.array[i + 1];
        ctx.fillRect(x * dimensions.width - dimensions.size / 2, y * dimensions.height - dimensions.size / 2, dimensions.size, dimensions.size);
      }
    }
  }

  return (
    <Container>
      <StyledCanvas id="canvas" height={dimensions.height} width={dimensions.width}></StyledCanvas>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCanvas = styled.canvas`
  border: 1px solid red;
`;

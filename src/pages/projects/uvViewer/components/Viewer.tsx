import styled from "styled-components";
import { useUvViewer } from "../store/uvStore";
import { useState, useEffect } from "react";

export const Viewer = () => {
  const { geo, update } = useUvViewer();
  const [dimensions, _setDimensions] = useState({ width: 400, height: 400, size: 2 });

  useEffect(() => {
    if (geo) {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      const ctx = canvas!.getContext("2d");

      if (ctx) {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        const uvs = geo.geometry.attributes.uv;
        const indices = geo.geometry.index!.array;

        // Draw squares for uv positions
        for (let i = 0; i < uvs.array.length; i += 2) {
          const x = uvs.array[i] * dimensions.width;
          const y = uvs.array[i + 1] * dimensions.height;
          ctx.fillRect(x - dimensions.size / 2, y - dimensions.size / 2, dimensions.size, dimensions.size);
        }

        // Draw lines to form triangles
        ctx.beginPath();
        for (let i = 0; i < indices.length; i += 3) {
          // First vertex
          let index = indices[i];
          let x = uvs.array[index * 2] * dimensions.width;
          let y = uvs.array[index * 2 + 1] * dimensions.height;
          ctx.moveTo(x, y);

          // Second vertex
          index = indices[i + 1];
          x = uvs.array[index * 2] * dimensions.width;
          y = uvs.array[index * 2 + 1] * dimensions.height;
          ctx.lineTo(x, y);

          // Third vertex
          index = indices[i + 2];
          x = uvs.array[index * 2] * dimensions.width;
          y = uvs.array[index * 2 + 1] * dimensions.height;
          ctx.lineTo(x, y);

          // Close the triangle
          index = indices[i];
          x = uvs.array[index * 2] * dimensions.width;
          y = uvs.array[index * 2 + 1] * dimensions.height;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
  }, [geo, dimensions]);

  return (
    <Container>
      <StyledCanvas id="canvas" height={dimensions.height} width={dimensions.width}></StyledCanvas>
      <ButtonContainer>
        <Button onClick={() => update({ mesh: "box" })}>box</Button>
        <Button onClick={() => update({ mesh: "torus" })}>torus</Button>
        <Button onClick={() => update({ mesh: "cylinder" })}>cylinder</Button>
        <Button onClick={() => update({ mesh: "sphere" })}>sphere</Button>
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

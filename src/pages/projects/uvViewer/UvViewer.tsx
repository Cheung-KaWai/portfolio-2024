import styled from "styled-components";
import { Scene } from "./components/Scene";
import { Viewer } from "./components/Viewer";

export const UvVierwer = () => {
  return (
    <Container>
      <Scene />
      <Viewer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

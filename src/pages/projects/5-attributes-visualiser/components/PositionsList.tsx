import styled from "styled-components";
import { useVisualer } from "../hooks/useVisualer";

export const PositionsList = () => {
  const { positionsList } = useVisualer();
  const positions = positionsList();
  return (
    <Container>
      {positions.map((x, key) => (
        <PositionElement key={key}>{key + " | " + x}</PositionElement>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
`;

const PositionElement = styled.p`
  color: white;
`;

import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

export const Grid: FC<PropsWithChildren> = ({ children }) => {
  return <GridContainer>{children}</GridContainer>;
};

const GridContainer = styled.div`
  width: 100svw;
  min-height: 100svh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 50svh 100px;
  padding: 5rem;
  gap: 1rem;
`;

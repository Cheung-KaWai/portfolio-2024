import { FC, PropsWithChildren } from "react";
import { Cursor } from "./Cursor";
import styled from "styled-components";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <Cursor />
      {children}
    </Container>
  );
};

const Container = styled.div`
  min-height: 100svh;
  width: 100svw;
`;

import { FC, PropsWithChildren } from "react";
import { Cursor } from "@components/Cursor";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

export const Layout: FC<PropsWithChildren> = () => {
  return (
    <Container>
      <Cursor />
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
  height: 100svh;
  min-height: 100svh;
  width: 100svw;
  background-color: #111120;
`;

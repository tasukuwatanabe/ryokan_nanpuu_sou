import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import Wrapper from "../components/Wrapper";
import Container from "../components/Container";
import Header from "../components/Header";
import styled from "styled-components";

const DIV_Content = styled.div`
  flex-grow: 1;
  padding-block: 20px;
  @media screen and (min-width: 768px) {
    padding-block: 50px;
  }
`;

export const Route = createRootRoute({
  component: () => (
    <Wrapper>
      <Header />
      <DIV_Content>
        <Container>
          <Outlet />
          <TanStackRouterDevtools />
        </Container>
      </DIV_Content>
    </Wrapper>
  ),
});

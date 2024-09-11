import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import Wrapper from "@/components/Wrapper";
import Container from "@/components/Container";
import Header from "@/components/Header";

export const Route = createRootRoute({
  component: () => (
    <Wrapper>
      <Header />
      <div className="flex-grow py-4 md:py-20">
        <Container>
          <Outlet />
          <TanStackRouterDevtools />
        </Container>
      </div>
    </Wrapper>
  ),
});

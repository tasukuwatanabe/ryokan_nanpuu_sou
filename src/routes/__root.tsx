import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { IAuthContext } from "@/contexts/authContext";
import Wrapper from "@/components/Wrapper";
import Container from "@/components/Container";
import Header from "@/components/Header";

interface routerContext {
  auth: IAuthContext;
}

export const Route = createRootRouteWithContext<routerContext>()({
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

import { Suspense, lazy } from "react";
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";

import Wrapper from "@/components/Wrapper";
import Container from "@/components/Container";
import Header from "@/components/Header";

const TanStackRouterDevtools =
  import.meta.env.VITE_NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

export const Route = createRootRouteWithContext()({
  component: () => (
    <Wrapper>
      <Header />
      <div className="flex-grow py-10 md:py-16">
        <Container>
          <Outlet />
          <ScrollRestoration />
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
        </Container>
      </div>
    </Wrapper>
  ),
});

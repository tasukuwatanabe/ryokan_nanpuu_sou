import { Suspense, lazy } from "react";
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";

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
    <div className="min-h-[100vh] flex flex-col">
      <Header />
      <div className="flex-grow py-10 md:py-16">
        <div className="px-4 md:px-6 mx-auto w-full max-w-[1000px] grid gap-y-6">
          <Outlet />
          <ScrollRestoration />
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
        </div>
      </div>
    </div>
  ),
});

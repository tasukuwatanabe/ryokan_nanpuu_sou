import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routeTree } from "@/routeTree.gen";
import { AuthProvider, useAuth } from "@/contexts/authContext";
import NotFound from "@/components/NotFound";
import "@/index.css";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <InnerApp />
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

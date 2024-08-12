import { createFileRoute } from "@tanstack/react-router";

import PageGrid from "../components/PageGrid";

const Index = () => (
  <PageGrid>
    <aside>Room Filter</aside>
    <main>Room List</main>
  </PageGrid>
);

export const Route = createFileRoute("/")({
  component: Index,
});

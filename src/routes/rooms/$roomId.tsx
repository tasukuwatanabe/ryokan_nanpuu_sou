import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rooms/$roomId")({
  component: () => <div>Hello /rooms/$roomId!</div>,
});

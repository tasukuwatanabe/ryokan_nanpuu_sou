import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mypage")({
  component: () => <div>Hello /mypage!</div>,
});

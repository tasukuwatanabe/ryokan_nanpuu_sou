import { createFileRoute } from "@tanstack/react-router";

const Login = () => <div>Login</div>;

export const Route = createFileRoute("/login")({
  component: Login,
});

import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "../components/LoginForm";

const Login = () => <LoginForm />;

export const Route = createFileRoute("/login")({
  component: Login,
});

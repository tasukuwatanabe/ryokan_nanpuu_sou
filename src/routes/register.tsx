import { createFileRoute } from "@tanstack/react-router";

import RegisterForm from "@/components/RegisterForm";

const Register = () => <RegisterForm />;

export const Route = createFileRoute("/register")({
  component: Register,
});

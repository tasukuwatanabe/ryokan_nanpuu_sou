import { createFileRoute } from "@tanstack/react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import LoginForm from "@/components/LoginForm";

const Login = () => (
  <Card className="w-full mx-auto max-w-md">
    <CardHeader>
      <CardTitle className="text-2xl">ログイン</CardTitle>
    </CardHeader>
    <CardContent>
      <LoginForm />
    </CardContent>
  </Card>
);

export const Route = createFileRoute("/login")({
  component: Login,
});

import { createFileRoute } from "@tanstack/react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import RegisterForm from "@/components/RegisterForm";

const Register = () => (
  <Card className="w-full mx-auto max-w-md">
    <CardHeader>
      <CardTitle className="text-2xl">新規登録</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-8">
      <RegisterForm />
    </CardContent>
  </Card>
);

export const Route = createFileRoute("/register")({
  component: Register,
});

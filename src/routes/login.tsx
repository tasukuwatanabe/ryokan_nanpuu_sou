import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";

import LoginForm from "@/components/LoginForm";

const DIV_LoginPageWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const Login = () => {
  return (
    <DIV_LoginPageWrapper>
      <LoginForm />
    </DIV_LoginPageWrapper>
  );
};

export const Route = createFileRoute("/login")({
  component: Login,
});

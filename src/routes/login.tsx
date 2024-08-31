import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";

import LoginForm from "../components/LoginForm";

const DIV_LoginPageWrapper = styled.div`
  width: 100%;
  max-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
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

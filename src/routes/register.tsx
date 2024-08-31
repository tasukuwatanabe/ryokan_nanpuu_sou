import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";

import RegisterForm from "../components/RegisterForm";

const DIV_RegisterPageWrapper = styled.div`
  width: 100%;
  max-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Register = () => {
  return (
    <DIV_RegisterPageWrapper>
      <RegisterForm />
    </DIV_RegisterPageWrapper>
  );
};

export const Route = createFileRoute("/register")({
  component: Register,
});

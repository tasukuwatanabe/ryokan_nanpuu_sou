import { type ReactNode } from "react";
import styled from "styled-components";

const DIV_Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return <DIV_Wrapper>{children}</DIV_Wrapper>;
};

export default Wrapper;
